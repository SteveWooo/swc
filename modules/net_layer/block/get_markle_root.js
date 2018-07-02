const crypto = require('crypto');
module.exports = (client, trades)=>{
	//TODO dht markle tree;
	let result = "";
	for(var i in trades){
		result += i;
	}
	result = crypto.createHash('md5').update(result).digest('hex');
	return result;
}