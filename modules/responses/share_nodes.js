const config = global.p2p.config;

function share_block(client, msg, info){
	if(global.p2p.cache['max_block_number'] < msg.block_number){
		global.p2p.cache['max_block_number'] = msg.block_number;
	}
	//判断对方的区块层数是否比自己的区块层数高，如果比自己低，则分享区块。（不需要处理比自己高的case）;
	let prev_block = global.p2p.cache.prev_block;
	if(prev_block.block_number > msg.block_number){
		//share block;
		let block_share = client.storage.get_block_by_number(client, parseInt(msg.block_number) + 1);
		let trades_share = client.storage.get_trade_by_block(client, block_share[0]['hash_id']);
		client.actions.send_block_to(client, info, block_share[0], trades_share);
	}
}

exports.handle = (client, msg, info)=>{
	let _nodes = msg.response['nodes'];
	let _name = msg.response['name'];
	//如果是自己 直接跳出
	if(_name == config.name){
		return ;
	}
	share_block(client, msg, info);
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