require('./init_config')(); //全局初始化
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const config = global.p2p.config;
let nodes = global.p2p.nodes;
const responses = { //接受响应操作
	share_nodes : require('./responses/share_nodes').handle, //心跳事件
	trade : require('./responses/trade'), //接收到新交易事件
	block : ()=>{}, //接收到心区块事件
}
const requests = {
	get_block : (number)=>{}, //请求获取区块和交易内容
}
const client_actions = { //客户端主动行为
	start_share_nodes : require('./clients/start_share_nodes').handle, //节点心跳启动 @param client
	broadcast : require('./clients/broadcast').handle, //@param client nodes data
	send_trade : require('./clients/send_trade'), //广播发送一个交易请求 @param client trade
	send_block : ()=>{}, //广播一个新区块 @param client block trades
}

const trade = {
	create : require('./trade/create'), //新增一笔交易 @param client data key
	valid : require('./trade/valid'), //检查交易正确性，包括是否已经被写入链 @param client trade
	cache : require('./trade/cache'), //缓存交易 @param client trade
}

const block = {
	valid : ()=>{}, //验证block真实性 @param client block trades
	get_work : ()=>{}, //获取当前需要挖矿的工作 @param client
	submit_work : ()=>{}, //提交挖矿结果 @param client newblock trades
}

const storage = { //封装存储接口，方便扩容
	save_trade : ()=>{}, //保存交易 @param client trade name
	save_block : ()=>{}, //保存区块 @param client block name
	get_block : ()=>{}, //获取block @param client block_hash_id
	get_trade : ()=>{}, //获取trade @param client trade_hash_id
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
	};
}