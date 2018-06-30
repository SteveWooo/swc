module.exports = async (req, res)=>{
	let nodes = global.p2p.nodes;
	res.send({
		code : 2000,
		data : {
			nodes : nodes
		}
	})
}