let client = require('./modules/init_client')();
let interval = client.run(client); //启动节点
/*
* 启动网络 寻找节点
* 获取最长链区块的总hash值
* 同步区块
*/

setInterval(()=>{
	let nodes = global.p2p.nodes;
	for(var i in nodes){
		console.log(nodes[i].name)
	}
}, 1000)