module.exports = async (client, data, key)=>{
	if(key.public_key.length != 133){
		throw JSON.parse({
			code : 403,
			message : "creator error"
		})
	}
	//TODO：检查协议

	let trade = {
		creator : key.public_key,
		data : typeof data == "object" ? JSON.stringify(data) : data
	}

	//签名
	let trade_signed = await client.utils.keys.sign(trade, key.private_key);

	return trade_signed;
}