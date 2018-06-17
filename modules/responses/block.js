module.exports = async (client, msg, info)=>{
	let prev_block = global.p2p.cache.prev_block;
	let new_block = msg.response.block;
	let new_trades = msg.response.trades;
	new_block = typeof new_block == 'string' ? JSON.parse(new_block) : new_block;
	new_trades = typeof new_trades == 'string' ? JSON.parse(new_trades) : new_trades;
	//重复收到广播 无视掉
	if(prev_block.hash_id == new_block.hahs_id){
		return ;
	}
	//valid block
	let valid = await client.block.valid(client, prev_block, {
		block : new_block,
		trades : new_trades
	});

	if(!valid){
		return ;
	}

	//检查是否已经存储了该block
	let storage_valid = client.storage.get_block_by_id(new_block.hash_id);
	if(storage_valid.length != 0){
		// 重复了
		return ;
	}

	//持久存储
	client.storage.save_block(client, new_block);

	for(var i in new_trades){
		client.storage.save_trade(client, new_trades[i]);
	}

	//更新缓存
	global.p2p.cache.prev_block = new_block;

	console.log('get new Block:');
	for(var i in new_trades){
		console.log(new_trades[i]['data']);
	}

	//广播新区块
	client.actions.send_block(client, new_block, new_trades);
}