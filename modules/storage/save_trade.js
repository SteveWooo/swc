const config = global.p2p.config;
const fs = require('fs');

module.exports = (client, trade)=>{
	let path = config.data_path;
	fs.appendFileSync(path + "/" + config.name + "/trades/trade", "\n" + JSON.stringify(trade));
	return ;
}