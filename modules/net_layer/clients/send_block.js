const config = global.p2p.config;
module.exports = (client, block, trades)=>{
	let nodes = global.p2p.nodes;
	client.actions.broadcast(client, nodes, {
		operate : "block",
		response : {
			name : config['name'],
			block : block,
			trades : trades
		}
	});
}