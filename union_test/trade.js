module.exports = async (client)=>{
	try{
		let data = "this is new trade";
		let key = await client.utils.keys.create();
		let trade = await client.trade.create(client, data, key);
		console.log("trade:");
		console.log(trade);
		console.log("========================");
		console.log("change:");
		// trade.creator = "EOS123" + trade.creator.substring(6);	
		console.log(trade);
		console.log("========================");
		let valid = await client.trade.valid(client, trade);
		console.log("valid : " + valid);
		console.log("========================");
	}catch(e){
		console.log(e);
	}
}