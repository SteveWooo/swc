let config = global.p2p.config;
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
			"difficult" : "0000",
		}

		let trade = await client.trade.create(client, "hahaha", config.default_key);
		// trade.sign = trade.sign.replace(/4/g, 'a');
		console.log(trade);
		let new_data = {
			nonce : "asdasd",
			trades : {},
			key : config.default_key
		}
		new_data.trades[trade.hash_id] = trade;
		let new_block = (await client.block.create(client, prev_block, new_data)).block;
		//create block
		console.log(new_block);
		// new_block.sign = new_block.sign.replace(/3/g, '');
		//valid block
		let valid = await client.block.valid(client, new_block, new_data.trades);
		console.log("valid : " + valid);
	}catch(e){
		console.log(e);
	}
}