module.exports = (req, res)=>{
	let prev_block = global.p2p.cache.prev_block;
	res.send({
		code : 2000,
		data : {
			prev_block : prev_block
		}
	})
}