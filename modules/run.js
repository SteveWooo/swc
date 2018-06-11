let config = global.p2p.config;
function init_udp_client(client){
	client.udp_client.bind(config.port);
	client.udp_client.on('error', e=>{
		console.log(e);
	})
	client.udp_client.on('message', (msg, info)=>{
		console.log('get : ' + info.address + ":" + info.port);
		try{
			msg = JSON.parse(msg.toString());
		}catch(e){
			console.log(e);
			return ;
		}
		if(!msg.operate){
			return ;
		}

		if(msg.request != undefined && client.requests[msg.operate] != undefined){
			client.requests[msg.operate](msg, info, client.udp_client);
		} else if (msg.response != undefined && client.responses[msg.operate] != undefined){
			client.responses[msg.operate](msg, info, client.udp_client);
		}
	})
	client.udp_client.on('listening', ()=>{
		console.log('client listened at : ' + config.port);
	})
}

module.exports.handle = (client)=>{
	init_udp_client(client);
	//读取区块
	
	//同步区块
	return client.actions.start_share_nodes(client); //心跳行为
}