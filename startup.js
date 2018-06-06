require('./modules/init')();
let client = require('./modules/init_client')();
setInterval(()=>{
	let nodes = client.get_nodes();
	for(var i in nodes){
		console.log({
			ip : nodes[i].address,
			port : nodes[i].port
		})
	}
}, 1000)