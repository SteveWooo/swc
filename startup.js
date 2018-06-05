require('./modules/init')();
let client = require('./modules/init_client')();
setInterval(()=>{
	console.log(client.get_nodes());
}, 1000)