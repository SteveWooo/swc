let config = global.p2p.config;
let crypto = require('crypto');
module.exports = async (client)=>{
	try{
		let prev_block = { //genesis block
			"create_time" : "1528739474647",
			"version" : "0.1",
			"hash_id" : "00000000000000000000000000000000",
			"prev_hash" : "00000000000000000000000000000000",
			"merkle_root" : "00000000000000000000000000000000",
			"block_number" : 0,
			"nonce" : "",
			"difficult" : "000",
		}

		let trade = await client.trade.create(client, "hahaha", config.default_key);
		// trade.sign = trade.sign.replace(/4/g, 'a');
		// console.log(trade);
		let new_data = {
			nonce : "asdasd",
			trades : {},
			key : config.default_key
		}
		new_data.trades[trade.hash_id] = trade;

		//miner:
		let number = 1;
		while(++number){
			let new_hash = crypto.createHash('md5').update(number + "").digest('hex');
			new_hash = new_hash.substring(0, prev_block.difficult.length);
			if(new_hash == prev_block.difficult){
				console.log('success:' + number);
				break;
			}
		}

		new_data.nonce = number;
		console.log('nonce : ' + new_data.nonce);

		let new_block = (await client.block.create(client, prev_block, new_data)).block;
		//create block
		// console.log(new_block);
		// new_block.sign = new_block.sign.replace(/3/g, '');
		//valid block
		let valid = await client.block.valid(client, prev_block, {
			block : new_block,
			trades : new_data.trades
		});
		// console.log("valid : " + valid);

		client.storage.save_block(client, new_block);

	}catch(e){
		console.log(e);
	}
}