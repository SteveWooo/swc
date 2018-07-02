const fs = require('fs');

function open_file(path){
	return new Promise(resolve=>{
		fs.open(path, 'a', ()=>{
			resolve();
		})
	})
}

module.exports = async (storage_name)=>{
	const config = global.p2p.config;
	let path = config.data_path;
	if( !fs.existsSync(path) ){
		fs.mkdirSync(path);
	}
	if( !fs.existsSync(path + "/" + config.storage_name) ){
		fs.mkdirSync(path + "/" + config.storage_name);
		fs.mkdirSync(path + "/" + config.storage_name + "/blocks");
		fs.mkdirSync(path + "/" + config.storage_name + "/trades");
	}

	if( !fs.existsSync(path + "/" + config.storage_name + "/blocks") ){
		fs.mkdirSync(path + "/" + config.storage_name + "/blocks");
	}

	if( !fs.existsSync(path + "/" + config.storage_name + "/trades") ){
		fs.mkdirSync(path + "/" + config.storage_name + "/trades");
	}

	await open_file(path + "/" + config.storage_name + "/blocks/block");
	await open_file(path + "/" + config.storage_name + "/trades/trade");
}