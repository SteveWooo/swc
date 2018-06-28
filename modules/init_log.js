const fs = require('fs');

function open_file(path){
	return new Promise(resolve=>{
		fs.open(path, 'a', ()=>{
			resolve();
		})
	})
}

async function check_logs (){
	const config = global.p2p.config;
	let path = config.log_path;
	if( !fs.existsSync(path) ){
		fs.mkdirSync(path);
	}
	await open_file(path + "/" + "error.log");
	await open_file(path + "/" + "log.log");
}

module.exports = check_logs;