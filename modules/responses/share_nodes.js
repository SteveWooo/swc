const config = global.p2p.config;

function share_block(client, msg, info){
	//判断对方的区块层数是否比自己的区块层数高，如果比自己低，则分享区块。（不需要处理比自己高的case）;
}

exports.handle = (client, msg, info)=>{
	console.log(msg);
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