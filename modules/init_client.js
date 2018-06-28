require('./init_config')(); //全局初始化
require('./init_cache')(); //初始化缓存
require('./init_log')(); //初始化日志
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const config = global.p2p.config;
let nodes = global.p2p.nodes;
const responses = { //接受响应操作
	share_nodes : require('./responses/share_nodes').handle, //心跳事件
	trade : require('./responses/trade'), //接收到新交易事件
	block : require('./responses/block'), //接收到心区块事件
}
const requests = {
	get_block : (number)=>{}, //请求获取区块和交易内容
}
const client_actions = { //客户端主动行为
	start_share_nodes : require('./clients/start_share_nodes').handle, //节点心跳启动 @param client
	broadcast : require('./clients/broadcast').handle, //@param client nodes data
	send_trade : require('./clients/send_trade'), //广播发送一个交易请求 @param client trade
	send_block : require('./clients/send_block'), //广播一个新区块 @param client block trades
	send_block_to : require('./clients/send_block_to'), //发送一个区块给某个地址 @param client node block trades
}

const trade = {
	create : require('./trade/create'), //新增一笔交易 @param client data key
	valid : require('./trade/valid'), //检查交易正确性，包括是否已经被写入链 @param client trade
	cache : require('./trade/cache'), //缓存交易 @param client trade
}

const block = {
	get_markle_root : require('./block/get_markle_root'), //获取markle root @param client trades
	create : require('./block/create'), //创建区块 @param client prev_block obj{nonce, trades, key}
	valid : require('./block/valid'), //验证block真实性 @param client block key
	get_difficult : require('./block/get_difficult'), //获取新区块难度 @param client prev_block
}

const storage = { //封装存储接口，方便扩容
	save_trade : require('./storage/save_trade'), //保存交易 @param client trade
	get_trade_by_id : require('./storage/get_trade_by_id'), //获取trade @param client trade_hash_id
	get_trade_by_block : require('./storage/get_trade_by_block'), //获取trade @param client block_hash_id
	save_block : require('./storage/save_block'), //保存区块 @param client block
	get_block_by_id : require('./storage/get_block_by_id'), //获取block @param client block_hash_id
	get_block_by_number : require('./storage/get_block_by_number'), //获取block @param client block_number
}

const mq = {
	init : require('./mq/init'), //消息队列初始化 @param client
	add : require('./mq/add'), //消息队列 @param client data callback
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
	};
}