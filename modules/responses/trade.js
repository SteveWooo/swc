module.exports = async (client, msg, info)=>{
	//验证真实性
	let trade = msg.response.trade;

	let valid = await client.trade.valid(client, trade);
	if(!valid){
		console.log('valid faile');
		return ;
	}

	//验证通过加入缓存
	client.trade.cache.add(trade);
	return ;
}