const config = global.p2p.config;

module.exports = (client, trade)=>{
	let nodes = global.p2p.nodes;
	client.actions.broadcast(client, nodes, {
		operate : "trade",
		response : {
			name : config['name'],
			trade : trade
		}
	});
}