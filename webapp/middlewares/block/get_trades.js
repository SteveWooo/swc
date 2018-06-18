module.exports = (req, res)=>{
	let block_number = req.query.block_number;
	if(!block_number || parseInt(block_number) != block_number){
		send({
			code : 4001,
			message : "params error",
		});
		return ;
	}

	let block = req.swc.storage.get_block_by_number(req.swc, block_number);
	if(block.length == 0){
		res.send({
			code : 4004,
			message : "empty",
		});
		return ;
	}

	let trades = req.swc.storage.get_trade_by_block(req.swc, block[0].hash_id);
	res.send({
		code : 2000,
		data : {
			trades : trades
		}
	})
}