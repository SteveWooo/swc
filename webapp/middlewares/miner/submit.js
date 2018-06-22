const crypto = require('crypto');
const config = global.p2p.config;
module.exports = async (req, res)=>{
	let client = req.swc;
	let nonce = req.query.nonce;
	let prev_block = global.p2p.cache.prev_block;
	let new_hash = crypto.createHash('md5').update(prev_block.hash_id + nonce).digest('hex');
	new_hash = new_hash.substring(0, prev_block.difficult.length);
	if(new_hash != prev_block.difficult){
		res.send({
			code : 4001,
			message : "nonce error",
		});
		return ;
	}

	let result = await client.block.create(client, prev_block, {
		trades : global.p2p.cache.trades,
		key : config.default_key,
		nonce : nonce
	})	

	req.swc.actions.send_block(client, result.block, result.trades);
	req.swc.trade.cache.clear();

	res.send({
		code : 2000,
		message : "success"
	})
}