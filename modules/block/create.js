const config = global.p2p.config;
const crypto = require('crypto');

//获取新区块难度
function get_difficult(client, prev_block, new_data){
	const avg_count = 3; //取这个数量区块的平均挖矿速率
	const target_time = 60000; //争取获得的挖矿时间
	//每10个矿块调整一次难度
	// console.log('difficult:' + prev_block.difficult);
	// console.log(prev_block.block_number);
	if(prev_block.block_number % 3 != 0 || prev_block.block_number < avg_count){
		return prev_block.difficult;
	}

	if(prev_block.block_number == 0){
		return prev_block.difficult;
	}
	
	//获取前avg_count个块

	let blocks = client.storage.get_block_by_number(client, prev_block.block_number - avg_count, avg_count);
	let all_time = 0;
	for(var i=1;i<blocks.length;i++){
		if(blocks[i].block_number == 1){ //创世区块不加入计算
			all_time += target_time;
			continue;
		}
		all_time += blocks[i].create_time - blocks[i-1].create_time;
	}
	//根据平均时间调整新难度
	let avg_time = all_time / avg_count;
	// console.log('avg:' + avg_time);

	if(avg_time > target_time * 2.5){ //太慢，要降低难度
		return prev_block.difficult.substring(0, prev_block.difficult.length - 1);
	}

	if(avg_time < target_time * 0.4){ //太快，要加大难度
		return prev_block.difficult + "0";
	}

	return prev_block.difficult;
}

/*
@param prev_block 上一个区块
@param new_data 新一个区块的数据
new_data = {
	nonce : nonce, //挖矿结果
	trades : trades, //这个块的交易内容
	key : 矿工的公密钥
}
*/
module.exports = async (client, prev_block, new_data)=>{
	let markle_root = client.block.get_markle_root(client, new_data.trades);
	let block = {
		"create_time" : +new Date(),
		"version" : config.version,
		"hash_id" : crypto.createHash('md5').update(prev_block.hash_id + 
			new_data.nonce + 
			markle_root).digest('hex'),
		"prev_hash" : prev_block.hash_id,
		"merkle_root" : markle_root,
		"block_number" : parseInt(prev_block.block_number) + 1,
		"nonce" : new_data.nonce,
		"difficult" : get_difficult(client, prev_block, new_data),
		"creator" : new_data.key.public_key
	}
	let trades = new_data.trades;
	for(var i in trades){
		trades[i].block_id = block.hash_id;
	}

	//sign block
	block = await client.utils.keys.block_sign(block, new_data.key.private_key);

	return {
		block : block,
		trades : trades
	};
}