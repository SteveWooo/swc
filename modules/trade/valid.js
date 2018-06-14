const crypto = require('crypto');
module.exports = async (client, trade)=>{
	if(parseInt(trade.create_time) != trade.create_time ||
		(parseInt(trade.create_time) + "").length != 13){
		return false;
	}
	let msg = trade.creator + trade.create_time + trade.data + trade.random;
	let msg_hash = crypto.createHash('md5').update(msg).digest('hex');

	//hash_id检查
	if(msg_hash != trade.hash_id){
		return false ;
	}

	//TODO 检查该hash是否已经存入链中

	let valid = await client.utils.keys.valid(trade.creator, msg_hash, trade.sign);
	return valid;
}