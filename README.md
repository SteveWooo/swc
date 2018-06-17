## 简述
基于POW共识的区块链系统

## 本地演示启动（多控制台）
* git clone https://github.com/SteveWooo/swc
* cd swc
* 窗口1 : node ./startup.js
* 窗口2 : node ./startup.js c1 7001

##### 命令说明：
./node startup.js {全局唯一客户端编号（beta版本会自动分配）} {p2p节点端口号}

## 功能模块
### 创建交易
参数：交易数据，公密钥
### 广播交易
交易内容传递给所有节点，然后节点缓存交易
### pow挖矿
根据prev_block，计算nonce
### 创建区块
计算完nonce，把当前本地缓存的所有交易绑定到区块中
### 广播区块
把区块数据+交易数据广播到p2p网络中
### 写入节点数据库
p2p网络中的节点接受到区块信息后，验证区块签名与所有交易签名正确无误后，写入本地

## 配置
#### modules/init.js 中config.remote为默认节点列表，该节点必须能被所有节点直接访问
#### modules/init.js 中config/webapp为用户图形界面接口配置（port节点等）

#### 注意：公网节点和普通节点业务逻辑上没任何差别

## 接口说明：
### client（总工具库）
### client.trade : 交易库
##### client.trade.create : 创建交易
##### client.trade.cache : 交易缓存
##### client.trade.valid : 验证交易

### client.actions : 客户端主动操作
##### client.actions.start_share_nodes : 开始发起心跳（客户端上线）
##### client.actions.broadcast : 多播（广播绑定的所有节点）
##### client.actions.send_trade : 广播新交易
##### client.actions.send_block : 广播新区块
##### client.actions.send_block_to : 发送某个区块给某个特定节点

### client.block : 区块库
##### client.block.create : 区块创建
##### client.block.get_markle_root : 获取markle树的根哈希值
##### client.block.valid : 验证区块正确性

### client.storage : 持久层接口
##### client.storage.save_trade : 把交易内容写入本地文件
##### client.storage.get_trade_by_id : 根据交易trade_id获取交易内容
##### client.storage.get_trade_by_block : 根据blockid获取该区块下的所有交易
##### client.storage.save_block : 把区块写入本地文件
##### client.storage.get_block_by_id : 根据hash_id获取
##### client.storage.get_block_by_number : 根据区块编号获取区块

### client.utils : 公用接口
#### client.utils.keys : 公密钥库
##### client.utils.keys.create : 创建一对公密钥
##### client.utils.keys.valid : 验证签名
##### client.utils.keys.trade_sign : 签名交易
##### client.utils.keys.block_sign : 区块签名

## TODO list:
##### 区块错误回滚方案（取得对应编号的区块，如果校验失败，缓存prev_block回滚一个区块
##### 挖矿时间控制方案（需要参考比特币diffcult生成方法。