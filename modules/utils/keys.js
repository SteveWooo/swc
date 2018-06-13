const eccrypto = require('eccrypto');
const crypto = require('crypto');

exports.create = async ()=>{
	let private_key = crypto.randomBytes(32).toString('hex');
	let public_key = eccrypto.getPublic(new Buffer(private_key, 'hex')).toString('hex');
	let key = {
		public_key : "SWC" + public_key,
		private_key : private_key
	}

	//以下为签名与认证流程
	// let msg = "hello";
	// //TODO 尽可能用 sha256
	// let data = crypto.createHash('md5').update(msg).digest('hex');

	// let sign = await eccrypto.sign(new Buffer(key.private_key, 'hex'), data);
	// sign = sign.toString('hex');
	// let verify = await eccrypto.verify(new Buffer(key.public_key.substring(3), 'hex'), data, sign);
	// console.log(verify);

	return key;
}



/*
struct trade = {
	hash_id : md5(public_key, create_time, data, random),
	creator : public_key,
	create_time : ms,
	data : String,
	sign : "sign",
	random : "6位int"
}
*/
exports.valid = async (trade)=>{
	//内容完整性检查
	if(parseInt(trade.create_time) != trade.create_time ||
		(parseInt(trade.create_time) + "").length != 13){
		return false;
	}
	let msg = trade.creator + trade.create_time + trade.data + trade.random;
	let msg_hash = crypto.createHash('md5').update(msg).digest('hex');

	//hash_id检查
	if(msg_hash != trade.hash_id){
		return false ;
	}

	//签名验证：
	try{
		eccrypto.verify(new Buffer(trade.creator.substring(3), 'hex'), trade.hash_id, trade.sign);
	}catch(e){
		return false;
	}

	return true;
}

/*
@param trade = {
	data : "交易内容",
	creator : "public key",
}
*/
exports.sign = async (trade, private_key)=>{
	if(!trade || !trade.creator 
		|| trade.creator.length != 133 
		|| trade.creator.substring(0, 3) != "SWC"
		|| !trade.data){
		throw JSON.stringify({
			code : 403,
			msg : "交易信息不全"
		})
	}
	
	trade.create_time = +new Date();
	trade.random = Math.floor(Math.random()*999999 + 100000);

	trade.hash_id = crypto.createHash('md5').update(trade.creator + 
			trade.create_time + 
			trade.data + 
			trade.random).digest('hex');

	trade.sign = (await eccrypto.sign(new Buffer(private_key, 'hex'), trade.hash_id)).toString('hex');

	return trade;
}