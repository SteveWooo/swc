const config = global.p2p.config;
const fs = require('fs');
const path = require('path');
const check_dir = require('./storage/check_dir');

async function init_block_data(){
	await check_dir(config.storage_name);
}

module.exports = async ()=>{
	await init_block_data();
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

	let prev_block = block_data[block_data.length - 1];
	prev_block = typeof prev_block == "string" ? JSON.parse(prev_block) : prev_block;

	//初始化缓存
	global.p2p.cache['prev_block'] = prev_block;
	global.p2p.cache['max_block_number'] = prev_block.block_number;
}