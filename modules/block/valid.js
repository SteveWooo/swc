const config = global.p2p.config;
const crypto = require('crypto');

module.exports = async (client, prev_block, new_block)=>{
	let block = new_block.block;
	let trades = new_block.trades;
	let markle_root = client.block.get_markle_root(client, trades);
	let valid = true ;
	//验证交易正确性
	for(var i in trades){
		let trade_valid = await client.trade.valid(client, trades[i]);
		if(!trade_valid){
			console.log('trade valid false');
			valid = false;
		}
	}
	//验证区块正确性
	let block_valid = await client.utils.keys.valid(block.creator, block.hash_id, block.sign);
	if(!block_valid){
		console.log('block valid false');
		valid = false;
	}
	//验证挖矿正确性：
	//上一个区块的difficult作为下一个区块的挖矿难度
	let nonce_hash = crypto.createHash('md5').update(prev_block.hash_id + "" + block.nonce).digest('hex');
	nonce_hash = nonce_hash.substring(0, prev_block.difficult.length);
	if(nonce_hash != prev_block.difficult){
		valid = false;
	}

	return valid;
}