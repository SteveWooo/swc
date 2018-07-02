module.exports = (client)=>{
	let queue = global.p2p.mq.queue;
	
	//消费
	setInterval(()=>{
		let msg = queue.shift();
		if(msg == undefined){
			return ;
		}
		try{
			msg.callback(msg.data);
		}catch(e){
			console.log(e.message);
		}
	}, 16);
}