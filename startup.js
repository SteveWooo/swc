let client = require('./modules/init_client')();
const config = global.p2p.config;

async function check_config(){
	if(config.default_key.public_key == ""
		|| config.default_key.private_key == ""){ // 需要生成一对公密钥
		let key = client.utils.keys.create();
		return key;
	} else {
		return true;
	}
}

async function main(){
	let check = await check_config();

	if(check === true){
		let interval = client.run(client); //启动节点
		require('./webapp/router')(client); //启动web服务
		require('./union_test')(client);
	} else {
		console.log("==============================================")
		console.log("||以下是为您生成的swc公密钥 请妥善保护好密钥 ||");
		console.log("||请复制到module/init_config中的default_key中||");
		console.log("||然后重新启动软件                           ||");
		console.log("==============================================")
		console.log(check);
	}
}

main();

// setInterval(()=>{
// 	console.log(global.p2p.nodes);
// }, 1000) 