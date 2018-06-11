const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const config = global.p2p.config;
let nodes = global.p2p.nodes;
const responses = { //接受响应响应操作
	share_nodes : require('./responses/share_nodes').handle
}
const requests = {}
const client_actions = { //客户端主动行为
	start_share_nodes : require('./clients/start_share_nodes').handle,
	stop_share : ()=>{},
	broadcast : require('./clients/broadcast').handle,
}

module.exports = ()=>{
	return {
		udp_client : client, //udp handle
		run : require('./run').handle, //启动
		actions : client_actions, //客户端主动行为
		responses : responses, //客户端接受数据行为
		requests : requests, //客户端接受请求行为
	};
}