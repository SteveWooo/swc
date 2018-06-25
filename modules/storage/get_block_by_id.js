const config = global.p2p.config;
const fs = require('fs');

module.exports = (client, hash_id)=>{
	let path = config.data_path;
	var result = fs.readFileSync(path + "/" + config.storage_name + "/blocks/block").toString();
	result = result.split('\n');
	result = result[0] == '' ? result.splice(1) : result; //去掉空的
	let block = [];
	result.map(d=>{
		try{
			d = JSON.parse(d);
		}catch(e){
			//不需要理会错误交易
		}
		if(d.hash_id === hash_id){
			block.push(d);
		}
	})

	return block;
}