module.exports = async (client)=>{
	try{
		let prev_block = { //genesis block
			"create_time" : "1528739474647",
			"version" : "0.1",
			"hash_id" : "00000000000000000000000000000000",
			"prev_hash" : "00000000000000000000000000000000",
			"merkle_root" : "00000000000000000000000000000000",
			"block_number" : 0,
			"nonce" : "",
			"difficult" : "0000",
		}

		let new_block = client.block.create(client, prev_block, {
			nonce : "asdasd",
			trades : {},
			creator : "public_key"
		})

		console.log(new_block);

	}catch(e){
		console.log(e);
	}
}