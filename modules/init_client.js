require('./init_config')(); //全局初始化
require('./init_cache')(); //初始化缓存
require('./init_log')(); //初始化日志
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const config = global.p2p.config;
let nodes = global.p2p.nodes;
const responses = { //接受响应操作
	share_nodes : require('./net_layer/responses/share_nodes').handle, //心跳事件
	trade : require('./net_layer/responses/trade'), //接收到新交易事件
	block : require('./net_layer/responses/block'), //接收到心区块事件
}
const requests = {
	get_block : (number)=>{}, //请求获取区块和交易内容
}
const client_actions = { //客户端主动行为
	start_share_nodes : require('./net_layer/clients/start_share_nodes').handle, //节点心跳启动 @param client
	broadcast : require('./net_layer/clients/broadcast').handle, //@param client nodes data
	send_trade : require('./net_layer/clients/send_trade'), //广播发送一个交易请求 @param client trade
	send_block : require('./net_layer/clients/send_block'), //广播一个新区块 @param client block trades
	send_block_to : require('./net_layer/clients/send_block_to'), //发送一个区块给某个地址 @param client node block trades
}

const trade = {
	create : require('./net_layer/trade/create'), //新增一笔交易 @param client data key
	valid : require('./net_layer/trade/valid'), //检查交易正确性，包括是否已经被写入链 @param client trade
	cache : require('./net_layer/trade/cache'), //缓存交易 @param client trade
}

const block = {
	get_markle_root : require('./net_layer/block/get_markle_root'), //获取markle root @param client trades
	create : require('./net_layer/block/create'), //创建区块 @param client prev_block obj{nonce, trades, key}
	valid : require('./net_layer/block/valid'), //验证block真实性 @param client block key
	get_difficult : require('./net_layer/block/get_difficult'), //获取新区块难度 @param client prev_block
}

const storage = { //封装存储接口，方便扩容
	save_trade : require('./persistence_layer/storage/save_trade'), //保存交易 @param client trade
	get_trade_by_id : require('./persistence_layer/storage/get_trade_by_id'), //获取trade @param client trade_hash_id
	get_trade_by_block : require('./persistence_layer/storage/get_trade_by_block'), //获取trade @param client block_hash_id
	save_block : require('./persistence_layer/storage/save_block'), //保存区块 @param client block
	get_block_by_id : require('./persistence_layer/storage/get_block_by_id'), //获取block @param client block_hash_id
	get_block_by_number : require('./persistence_layer/storage/get_block_by_number'), //获取block @param client block_number

	new_app_dir : require('./persistence_layer/storage/app_new_dir'), //创建新的app目录 @param client app_name
}

const mq = {
	init : require('./utils/mq/init'), //消息队列初始化 @param client
	add : require('./utils/mq/add'), //消息队列 @param client data callback
}

const contract = {
	create : require('./application_layer/contract/create'),
}

var express = {
	run : require('./express_layer/express/run'), //初始化表示层 @param client
	data : {}
}

module.exports = ()=>{
	return {
		utils : require('./utils/index'), 
		udp_client : client, //udp handle
		run : require('./run').handle, //启动
		actions : client_actions, //客户端主动行为
		responses : responses, //客户端接受数据行为
		requests : requests, //客户端接受请求行为
		block : block, //区块相关操作
		trade : trade, //交易模块
		storage : storage, //持久层模块
		mq : mq, //消息队列
		contract : contract, //智能合约层
	};
}