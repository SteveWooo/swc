const config = global.p2p.config;
const fs = require('fs');

module.exports = (client, trade)=>{
	// TODO：检查trade中是否有blockid
	let path = config.data_path;
	fs.appendFileSync(path + "/" + config.storage_name + "/trades/trade", "\n" + JSON.stringify(trade));
	return ;
}