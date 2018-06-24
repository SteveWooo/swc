let queue = global.p2p.mq.queue;

module.exports = (client, data, callback)=>{
	let msg = {
		data : data,
		callback : callback
	}
	queue.push(msg);
}