const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const config = global.p2p.config;
let nodes = global.p2p.nodes;
const responses = {
	share_nodes : require('./responses/share_nodes').handle
}
const requests = {}

client.on('error', e=>{
	console.log(e);
})
client.on('message', (msg, info)=>{
	console.log('get : ' + info.address);
	try{
		msg = JSON.parse(msg.toString());
	}catch(e){
		console.log(e);
		return ;
	}
	if(!msg.operate){
		return ;
	}

	if(msg.request != undefined && requests[msg.operate] != undefined){
		requests[msg.operate](msg, info, client);
	} else if (msg.response != undefined && responses[msg.operate] != undefined){
		responses[msg.operate](msg, info, client);
	}
})
client.on('listening', ()=>{
	console.log('client listened at : ' + config.port);
})

//heart break;
let shareNodes = ()=>{
	let now = +new Date();
	for(var i in nodes){ //清理超时
		if(nodes[i].name == config['name']){
			continue ;
		}
		if(now - nodes[i]['ts'] > config.node_timeout){
			delete nodes[i];
		}
	}

	for(var i in nodes){
		if(nodes[i].name == config['name']){
			continue;
		}
		console.log("send:" + nodes[i].address + ":" + nodes[i].port);
		client.send(JSON.stringify({
			operate : "share_nodes",
			response : {
				name : config['name'],
				nodes : nodes
			}
		}), nodes[i].port, nodes[i].address, e=>{})
	}
}

//exports function
let getNodes = ()=>{
	return global.p2p.nodes;
}

let heartBreakInterval;
module.exports = ()=>{
	client.bind(config.port);
	heartBreakInterval = setInterval(()=>{ //heart break(todo cornjob)
		shareNodes();
	}, 1000);
	return {
		udp_client : client,
		get_nodes : getNodes,
	};
}