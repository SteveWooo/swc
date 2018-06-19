module.exports = (req, res)=>{
	if(req.query.block_number == undefined){
		let prev_block = global.p2p.cache.prev_block;
		res.send({
			code : 2000,
			data : {
				block : prev_block
			}
		})
	} else {
		let block = req.swc.storage.get_block_by_number(req.swc, req.query.block_number);
		res.send({
			code : 2000,
			data : {
				block : block
			}
		})
	}
}