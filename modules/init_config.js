const crypto = require('crypto');

//初始化客户端id，其实这里应该使用公钥
let init_client_name = ()=>{
	let name = crypto.randomBytes(64).toString('hex');
	return name;
}
module.exports = ()=>{
	global.p2p = {
		nodes : [],
		nodes_util : {
			clean_timeout : ()=>{
				let now = +new Date();
				let config = global.p2p.config;
				let nodes = global.p2p.nodes;
				for(var i=0;i<nodes.length;i++){ //清理超时
					if(now - nodes[i]['ts'] > config.node_timeout){
						nodes.splice(i, 1);
						i++;
					}
				}
			}
		},
		cache : {
			trades : {},
			prev_block : {}, //缓存上一个区块信息
			max_block_number : 0
		},
		mq : {
			queue : []
		},
		config : {
			version : "0.1",
			webapp : {
				port : parseInt(process.argv[3] || 7070) + 1
			},
			name : init_client_name(),
			storage_name : process.argv[2] || "main",
			port : process.argv[3] || 7070,
			node_timeout : 5000,
			max_p2p_nodes : 10, //最大同时存在节点数目
			max_sync_block : 10, //同时同步
			data_path : "./data", //区块&交易文件存放根目录
			log_path : "./logs", //日志存放根目录
			genesis_path : "./genesis.json", //创世区块存储节点
			default_key : { 
				public_key:'SWC04b262354fec873f39d37130cd7cde443a093f689ccf652e63c59fd5714a5d0516ae5df8282576b5647a3479709185bd0b5562b16aeaabb52a2ec3b58153fa024d',
				private_key:'d17bc2cb74cab9fc2b997434d9d928697146a20825830534a2938a75ab40384c',
				// public_key : "",
				// private_key : "" 
			}
		},
		remote : [{ //可配置的服务节点
			address : '127.0.0.1',
			// address : '115.28.241.66',
			port : 7070,
			// name : 'main'
		}]
	}

	global.p2p.remote.map(data=>{
		// if(data['name'] == global.p2p.config.name){ //不需要把自己加进去
		// 	return ;
		// }
		// global.p2p.nodes[data['name']] = data;
		// global.p2p.nodes[data['name']].ts = +new Date();

		// global.p2p.nodes.push(data);
	})
}