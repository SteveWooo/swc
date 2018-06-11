const config = global.p2p.config;

exports.handle = (msg, info, client)=>{
	let _nodes = msg.response['nodes'];
	let _name = msg.response['name'];
	let now = +new Date();
	let length = 0;

	for(var i=0;i<_nodes.length;i++){
		if(_nodes[i]['name'] == config.name){//接受时忽略自己
			continue; 
		}

		length ++;
		if(length >= config.max_p2p_nodes){
			break ;
		}

		global.p2p.nodes[i] = _nodes[i];
	}

	//更新info节点的时间戳
	let isNewNode = true;
	let nodes = global.p2p.nodes;
	for(var i=0;i<nodes.length;i++){
		if(nodes[i]['name'] == _name){
			nodes[i].ts = now;
			isNewNode = false;
		}
	}
	if(isNewNode){
		nodes.push({
			name : _name,
			ts : now,
			address : info.address,
			port : info.port
		})
	}
}