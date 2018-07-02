module.exports = (req, res)=>{
	let key = global.p2p.config.default_key;
	let data = req.query.data;
	if(data == undefined){
		res.sendStatus(200);
		return ;
	}

	req.swc.trade.create(req.swc, data, key).then(result=>{
		if(result.error){
			return result;
		}
		return req.swc.actions.send_trade(req.swc, result);
	}).then(result=>{
		if(result.error){
			res.send({
				code : 4000,
				message : result.error
			})
			return ;
		}
		res.send({
			code : 2000,
			data : {
				trade : result
			}
		})
	});
}