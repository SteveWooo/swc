const config = global.p2p.config;

module.exports = (client, node, block, trades)=>{
	client.udp_client.send(JSON.stringify({
			operate : "block",
			response : {
				name : config['name'],
				block : block,
				trades : trades
			}
		}), 
		node.port, 
		node.address, 
		e=>{
			//log err;
		}
	);
}