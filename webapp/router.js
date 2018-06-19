const express = require('express');
const app = express();
const config = global.p2p.config;

module.exports = (client)=>{
	app.use('/static', express.static('./webapp/static'));
	// 允许所有的请求形式
	app.use(function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  	next();
	});

	function init(req, res, next){
		req.swc = client;
		next();
	}
	//routers

	//获取区块状态
	app.get('/block/get_info', init, require('./middlewares/block/get_info'));

	//获取区块交易内容
	//@param block_number
	app.get('/block/get_trades', init, require('./middlewares/block/get_trades'));

	//提交新交易
	//@param data
	app.get('/trade/create', init, require('./middlewares/trade/create'));

	app.listen(config.webapp.port, (e)=>{
		if(e) throw JSON.stringify(e);
		console.log('webapp listened at : ' + config.webapp.port);
	})
}