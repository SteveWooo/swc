const config = global.p2p.config;

module.exports = (client, trade)=>{
	//先更新自己的trades cache
	global.p2p.cache.trades[trade.hash_id] = trade;
	let nodes = global.p2p.nodes;
	client.actions.broadcast(client, nodes, {
		operate : "trade",
		response : {
			name : config['name'],
			trade : trade
		}
	});

	return trade;
}