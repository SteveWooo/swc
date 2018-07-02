const config = global.p2p.config;
const crypto = require('crypto');

/*
* 每10个区块调整一次挖矿难度
*/
const avg_count = 10; //取这个数量区块的平均挖矿速率
const target_time = 10000; //争取获得的挖矿时间

//获取新区块难度
function get_difficult(client, prev_block){
	// console.log('difficult:' + prev_block.difficult);
	// console.log(prev_block.block_number);
	if(prev_block.block_number % 5 != 0 || prev_block.block_number < avg_count){
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

	if(avg_time > target_time * 2.5){ //太慢，要降低难度
		return prev_block.difficult.substring(0, prev_block.difficult.length - 1);
	}

	if(avg_time < target_time * 0.4){ //太快，要加大难度
		return prev_block.difficult + "0";
	}

	return prev_block.difficult;
}

module.exports = get_difficult;