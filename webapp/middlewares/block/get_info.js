module.exports = (req, res)=>{
	let max_block_number = global.p2p.cache['max_block_number'];
	if(req.query.block_number == undefined){
		let prev_block = global.p2p.cache.prev_block;
		res.send({
			code : 2000,
			data : {
				block : [prev_block],
				max_block_number : max_block_number
			}
		})
	} else {
		let block = req.swc.storage.get_block_by_number(req.swc, req.query.block_number, req.query.limit);
		res.send({
			code : 2000,
			data : {
				block : block,
				max_block_number : max_block_number
			}
		})
	}
}