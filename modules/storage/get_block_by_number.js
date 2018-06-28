const config = global.p2p.config;
const fs = require('fs');

module.exports = (client, block_number, limit)=>{
	limit = parseInt(limit == undefined ? 0 : limit);
	block_number = parseInt(block_number == undefined ? 0 : block_number);
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
			client.utils.log.error(client, "get_block_by_number : " + e.message);
		}
		if(d.block_number <= block_number + limit && d.block_number >= block_number){
			block.push(d);
		}
	})

	return block;
}