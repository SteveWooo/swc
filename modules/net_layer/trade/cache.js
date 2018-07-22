exports.add = (trade)=>{
	global.p2p.cache.trades[trade.hash_id] = trade;
}

exports.remove = (hash_id)=>{
	delete global.p2p.cache.trades[hash_id];
}

exports.get = ()=>{
	return global.p2p.cache.trades;
}

exports.clear = ()=>{
	for(var i in global.p2p.cache.trades){
		delete global.p2p.cache.trades[i];
	}
}