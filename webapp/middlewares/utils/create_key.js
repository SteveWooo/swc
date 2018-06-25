module.exports = async (req, res)=>{
	let key = await req.swc.utils.keys.create();
	res.send({
		code : 2000,
		data : {
			key : key
		}
	})
}