const fs = require('fs');
const config = global.p2p.config;
exports.info = (client, log)=>{
	log = "【"+(new Date())+"】" + log + "\n";
	fs.appendFileSync(config.log_path + "/log.log", log);
}

exports.error = (client, log)=>{
	log = "【"+(new Date())+"】" + log + "\n";
	fs.appendFileSync(config.log_path + "/error.log", log);
}