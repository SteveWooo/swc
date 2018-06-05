module.exports = ()=>{
	global.p2p = {
		nodes : {},
		config : {
			name : process.argv[2] || "main",
			port : process.argv[3] || 7070,
			node_timeout : 5000
		},
		remote : [{ //可配置的服务节点
			address : '127.0.0.1',
			port : 7070,
			name : 'main'
		}]
	}

	global.p2p.remote.map(data=>{
		global.p2p.nodes[data['name']] = data;
		global.p2p.nodes[data['name']].ts = +new Date();
	})
}