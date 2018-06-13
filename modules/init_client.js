require('./init_config')(); //全局初始化
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const config = global.p2p.config;
let nodes = global.p2p.nodes;
const responses = { //接受响应操作
	share_nodes : require('./responses/share_nodes').handle,
	valid : ()=>{}, //验证区块事件
}
const requests = {
	get_block : (number)=>{}, //请求获取区块和交易内容
}
const client_actions = { //客户端主动行为
	start_share_nodes : require('./clients/start_share_nodes').handle,
	stop_share : ()=>{},
	broadcast : require('./clients/broadcast').handle,

}

const trade = {
	create : ()=>{}, //新增一笔交易 需要密钥
}

const block = {
	valid : ()=>{},
	get_work : ()=>{}, //获取当前需要挖矿的工作
	submit_work : ()=>{}, //提交挖矿结果
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