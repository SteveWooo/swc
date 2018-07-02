const event_list = require('./event_list');
//{"event":"create_app","body":{"creator":"SteveWoo","create_time":"123","data":"hahah"}}
function check_data(data){
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

module.exports = async (client, data, key)=>{
	if(key.public_key.length != 133){
		return {
			error : "creator error"
		}
	}
	//TODO：检查协议
	data.replace(/\n/g, '');
	try{
		data = typeof data == "object" ? data : JSON.parse(data);
	}catch(e){
		console.log(e);
		return {
			error : e.message
		};
	}

	let check = check_data(data);
	if(check.error){
		return check;
	}

	let trade = {
		creator : key.public_key,
		data : JSON.stringify(data)
	}

	//签名
	let trade_signed = await client.utils.keys.trade_sign(trade, key.private_key);

	return trade_signed;
}