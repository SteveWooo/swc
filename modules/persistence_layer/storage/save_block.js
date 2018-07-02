const config = global.p2p.config;
const fs = require('fs');

module.exports = (client, block)=>{
	let path = config.data_path;
	fs.appendFileSync(path + "/" + config.storage_name + "/blocks/block", "\n" + JSON.stringify(block));
	return ;
}