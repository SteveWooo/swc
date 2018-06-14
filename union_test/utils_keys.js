module.exports = async (client)=>{
	let key = await client.utils.keys.create();
	console.log("new keys : ")
	console.log(key);
	console.log("=====================");

	let trade = {
		creator : key.public_key,
		data : "This is an trade msg"
	}
	console.log("trade:");
	console.log(trade);
	console.log("=====================");

	let sign_trade = await client.utils.keys.sign(trade, key.private_key);
	console.log(sign_trade);
	console.log("=====================");

	let valid = await client.utils.keys.valid(trade.creator, trade.hash_id, trade.sign);
	console.log("valid:" + valid);
}