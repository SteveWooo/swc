let client = require('./modules/init_client')();
let interval = client.run(client); //启动节点
require('./webapp/router')(client); //启动web服务
require('./union_test')(client);

setInterval(()=>{
	let nodes = global.p2p.nodes;
	for(var i in nodes){
		console.log(nodes[i].name)
	}
}, 1000)