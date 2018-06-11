let nodes = global.p2p.nodes;
let nodes_util = global.p2p.nodes_util;
const config = global.p2p.config;

function share(client){
	nodes_util.clean_timeout();
	//TODO : 当nodes长度为0时 如何处理
	client.actions.broadcast(client, nodes, {
		operate : "share_nodes",
		response : {
			name : config['name'],
			nodes : nodes
		}
	});
}

module.exports.handle = (client)=>{
	heartBreakInterval = setInterval(()=>{ //heart break(todo cornjob)
		share(client);
	}, 2000);

	return heartBreakInterval;
}