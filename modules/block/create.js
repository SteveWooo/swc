const config = global.p2p.config;
const crypto = require('crypto');
/*
1 : 计算markle hash 
2 : 
*/

function get_markle_root(trades){
	//TODO dht markle tree;
	let result = "";
	for(var i in trades){
		result += i;
	}
	result = crypto.createHash('md5').update(result).digest('hex');
	return result;
}

/*
@param prev_block 上一个区块
@param new_data 新一个区块的数据
new_data = {
	nonce : nonce, //挖矿结果
	trades : trades, //这个块的交易内容
	creator : public_key, //这个块的矿工
}
*/
module.exports = (client, prev_block, new_data)=>{
	let markle_root = get_markle_root(new_data.trades);
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
		"creator" : new_data.creator
	}
	let trades = new_data.trades;
	for(var i in trades){
		trades[i].block_id = block.hash_id;
	}
	//需要关联block
	return {
		block : block,
		trades : trades
	};
}