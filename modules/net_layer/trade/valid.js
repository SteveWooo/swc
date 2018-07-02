const crypto = require('crypto');
const event_list = require('./event_list');

function check_data(data){
	try{
		data = JSON.parse(data);
	}catch(e){
		return {
			error : "data is no a json"
		}
	}

	if(!data.event || !(data.event in event_list)){
		return {
			error : "event error"
		};
	}

	for(var i in event_list[data.event]){
		if(!(i in data.body)){
			return {
				error : "missing:" + i
			};
		}
	}

	return true;
}

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