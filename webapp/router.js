const express = require('express');
const app = express();
const config = global.p2p.config;

module.exports = (client)=>{
	app.use(express.static('./static'));

	//routers

	app.listen(config.webapp.port, (e)=>{
		if(e) throw JSON.stringify(e);
		console.log('webapp listened at : ' + config.webapp.port);
	})
}