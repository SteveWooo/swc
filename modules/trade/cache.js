exports.add = (trade)=>{
	global.p2p.cache[trade.hash_id] = trade;
}

exports.remove = (hash_id)=>{
	delete global.p2p.cache[hash_id];
}