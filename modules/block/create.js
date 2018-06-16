const config = global.p2p.config;
const crypto = require('crypto');
/*
@param prev_block 上一个区块
@param new_data 新一个区块的数据
new_data = {
	nonce : nonce, //挖矿结果
	trades : trades, //这个块的交易内容
	key : 矿工的公密钥
}
*/
module.exports = async (client, prev_block, new_data)=>{
	let markle_root = client.block.get_markle_root(client, new_data.trades);
	let block = {
		"create_time" : +new Date(),
		"version" : config.version,
		"hash_id" : crypto.createHash('md5').update(prev_block.hash_id + 
			new_data.nonce + 
			markle_root).digest('hex'),
		"prev_hash" : prev_block.hash_id,
		"merkle_root" : markle_root,
		"block_number" : parseInt(prev_block.block_number) + 1,
		"nonce" : new_data.nonce,
		"difficult" : "000",
		"creator" : new_data.key.public_key
	}
	let trades = new_data.trades;
	for(var i in trades){
		trades[i].block_id = block.hash_id;
	}

	//sign block
	block = await client.utils.keys.block_sign(block, new_data.key.private_key);

	return {
		block : block,
		trades : trades
	};
}