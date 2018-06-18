const crypto = require('crypto');

async function miner(client){
	//mining
	let prev_block = global.p2p.cache.prev_block;
	const key = global.p2p.config.default_key;
	let number = 1;
	while(++number){
		let new_hash = crypto.createHash('md5').update(prev_block.hash_id + number).digest('hex');
		new_hash = new_hash.substring(0, prev_block.difficult.length);
		if(new_hash == prev_block.difficult){
			console.log('success:', number);
			break;
		}
	}

	let data = "hello world";
	let trade_1 = await client.trade.create(client, data, key);
	data = "hello block : " + prev_block.block_number + "=======";
	let trade_2 = await client.trade.create(client, data, key);

	let trades = {};
	trades[trade_1['hash_id']] = trade_1;
	trades[trade_2['hash_id']] = trade_2;
	let result = await client.block.create(client, prev_block, {
		trades : global.p2p.cache.trades,
		key : key,
		nonce : number
	})

	//广播block
	client.actions.send_block(client, result.block, result.trades);
	client.trade.cache.clear();
}

module.exports = async (client)=>{
	setInterval(async ()=>{
		miner(client);
	}, 2000)
}