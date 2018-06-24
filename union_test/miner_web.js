const request = require('request');
const crypto = require('crypto');
let config = {
	base_url : "http://127.0.0.1",
	port : "7002",
	default_key : { 
		public_key:'SWC04b262354fec873f39d37130cd7cde443a093f689ccf652e63c59fd5714a5d0516ae5df8282576b5647a3479709185bd0b5562b16aeaabb52a2ec3b58153fa024d',
		private_key:'d17bc2cb74cab9fc2b997434d9d928697146a20825830534a2938a75ab40384c' 
	}
}

let cache = {
	finished_work : {}
}

function getWork(){
	return new Promise((resolve, reject)=>{
		let option = {
			url : config.base_url + ":" + config.port + "/miner/get_work"
		}

		request(option, (err, res, body)=>{
			body = JSON.parse(body);
			resolve(body);
		})
	});
}

function miner(prev_block){
	let nonce = 1;
	let time = +new Date();
	while(nonce++){
		let new_hash = crypto.createHash('md5').update(prev_block.hash_id + nonce).digest('hex');
		if(new_hash.substring(0, prev_block.difficult.length) == prev_block.difficult){
			let now = +new Date();
			let waste = now - time;
			console.log('waste : ' + waste);
			return nonce;
		}
	}
}

function submit(nonce){
	return new Promise((resolve, reject)=>{
		let option = {
			url : config.base_url + ":" + config.port + "/miner/submit?nonce=" + nonce
		}

		request(option, (err, res, body)=>{
			console.log(body);
			body = JSON.parse(body);
			console.log(body);
			//continue mining;
			resolve(body);
		})
	})
}

async function main(){
	let prev_block = (await getWork()).data.prev_block;
	if(cache.finished_work == prev_block.hash_id){
		main();
		return ;
	}
	console.log('difficult:' + prev_block.difficult);
	let nonce = miner(prev_block);
	cache.finished_work = prev_block.hash_id;
	console.log(nonce);
	let result = await submit(nonce);
	
	main();
}

main();