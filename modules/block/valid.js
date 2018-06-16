const config = global.p2p.config;

module.exports = async (client, block, trades)=>{
	let markle_root = client.block.get_markle_root(client, trades);
	let valid = true ;
	//验证交易正确性
	console.log('====');
	console.log(trades);
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

	return valid;
}