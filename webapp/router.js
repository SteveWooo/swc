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

	//获取挖矿任务
	app.get('/miner/get_work', init, require('./middlewares/miner/get_work'));

	//提交挖矿结果
	//@param nonce
	app.get('/miner/submit', init, require('./middlewares/miner/submit'));

	//提交新交易
	//@param data
	app.get('/trade/create', init, require('./middlewares/trade/create'));

	//创建新密钥
	app.get('/utils/create_key', init, require('./middlewares/utils/create_key'));
	//获取节点桶
	app.get('/utils/get_nodes', init, require('./middlewares/utils/get_nodes'));

	app.listen(config.webapp.port, (e)=>{
		if(e) throw JSON.stringify(e);
		console.log('webapp listened at : ' + config.webapp.port);
	})
}