module.exports = ()=>{
	global.p2p = {
		nodes : [],
		nodes_util : {
			clean_timeout : ()=>{
				let now = +new Date();
				let config = global.p2p.config;
				let nodes = global.p2p.nodes;
				for(var i=0;i<nodes.length;i++){ //清理超时
					if(now - nodes[i]['ts'] > config.node_timeout){
						nodes.splice(i, 1);
						i++;
					}
				}
			}
		},
		config : {
			webapp : {
				port : 8080
			},
			name : process.argv[2] || "main",
			port : process.argv[3] || 7070,
			node_timeout : 5000,
			max_p2p_nodes : 10, //最大同时存在节点数目
		},
		remote : [{ //可配置的服务节点
			address : '127.0.0.1',
			// address : '115.28.241.66',
			port : 7070,
			name : 'main'
		}]
	}

	global.p2p.remote.map(data=>{
		if(data['name'] == global.p2p.config.name){ //不需要把自己加进去
			return ;
		}
		// global.p2p.nodes[data['name']] = data;
		// global.p2p.nodes[data['name']].ts = +new Date();

		global.p2p.nodes.push(data);
	})
}