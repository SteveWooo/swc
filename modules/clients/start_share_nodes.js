let nodes = global.p2p.nodes;
let nodes_util = global.p2p.nodes_util;
const config = global.p2p.config;

//向配置好的远程节点发送心跳包请求
function check_remote(client){
	let remote = global.p2p.remote;
	client.actions.broadcast(client, remote, {
		operate : "share_nodes",
		response : {
			name : config['name'],
			nodes : nodes
		},
		block_number : global.p2p.cache['prev_block']['block_number']
	})
}

function share(client){
	nodes_util.clean_timeout();

	//当活跃节点列表为空
	if(nodes.length == 0){
		check_remote(client);
		return ;
	}
	client.actions.broadcast(client, nodes, {
		operate : "share_nodes",
		response : {
			name : config['name'],
			nodes : nodes
		},
		block_number : global.p2p.cache['prev_block']['block_number']
	});
}

module.exports.handle = (client)=>{
	heartBreakInterval = setInterval(()=>{ //heart break(todo cornjob)
		share(client);
	}, 2000);

	return heartBreakInterval;
}