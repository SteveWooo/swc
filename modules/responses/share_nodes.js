const config = global.p2p.config;

exports.handle = (msg, info, client)=>{
	let _nodes = msg.response['nodes'];
	let _name = msg.response['name'];
	let now = +new Date();

	for(var i in _nodes){ //添加新节点列表
		if(_nodes[i]['name'] == config.name){//忽略自己
			continue; 
		}
		global.p2p.nodes[i] = _nodes[i];
	}

	//更新info节点的时间戳
	global.p2p.nodes[_name] = {
		name : _name,
		ts : now,
		address : info.address,
		port : info.port
	}
}