/*
* client : 通用客户端 object
* nodes : 广播节点 array
* data : 广播数据 json object
*/
module.exports.handle = (client, nodes, data)=>{
	nodes.map(node=>{
		client.udp_client.send(JSON.stringify(data), 
			node.port, 
			node.address, 
			e=>{
				//log err;
			}
		);
	})
}