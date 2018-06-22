let client = require('./modules/init_client')();
let interval = client.run(client); //启动节点
require('./webapp/router')(client); //启动web服务
require('./union_test')(client);

// setInterval(()=>{
// 	console.log(global.p2p.cache.trades);
// }, 1000)