const config = global.p2p.config;
const fs = require('fs');
const path = require('path');
const check_dir = require('./storage/check_dir');

//获取区块文件中的最长链
//ps:此处可优化空间极大，但由于客户端性能要求不高，推后实现
function get_max(blocks){
	let max = 0;
	//这里直接sort一下就行了
	for(var i=0;i<blocks.length;i++){
		let json = typeof blocks[i] == "string" ? JSON.parse(blocks[i]) : blocks[i];
		json.block_number > max;
		max = json.block_number;
	}

	for(var i=0;i<blocks.length;i++){
		let json = typeof blocks[i] == "string" ? JSON.parse(blocks[i]) : blocks[i];
		if(json.block_number == max){
			return json;
		}
	}
}

module.exports = async ()=>{
	//检查区块存放路径是否存在
	await check_dir(config.storage_name);
	let block_data = fs.readFileSync(config.data_path + "/" + config.storage_name + "/blocks/block").toString();
	block_data = block_data.split('\n');
	//清理空的内容
	for(var i=0;i<block_data.length;i++){
		if(block_data[i] == ''){
			block_data.splice(i, 1);
			i++;
		}
	}

	//如果持久层区块为空，写入官方创世区块:
	if(block_data.length < 1){
		let genesis = fs.readFileSync(config.genesis_path).toString();
		genesis = JSON.parse(genesis);
		block_data.push(genesis);
	}

	// let prev_block = block_data[block_data.length - 1];
	let prev_block = get_max(block_data);

	prev_block = typeof prev_block == "string" ? JSON.parse(prev_block) : prev_block;

	//初始化缓存
	global.p2p.cache['prev_block'] = prev_block;
	global.p2p.cache['max_block_number'] = prev_block.block_number;
}