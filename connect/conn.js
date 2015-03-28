var net = require('net');
var server = net.createServer();
var sockets = [];
var stuNum = 1;
var fs = require('fs');
exports.createServer = function(){

	server.on('connection',function(socket){
	console.log('got a new connection.');
	socket.setEncoding('utf8');
	socket.setNoDelay(true);
	var str = '';
	var content = '';
	sockets.push(socket);
	socket.on('data',function(data){
		//console.log('got data: ',data);
		sockets.forEach(function(otherSocket){
			if(otherSocket !== socket){
				//console.log("otherSocket="+otherSocket);
				try{
					otherSocket.write(data);
				}catch(e){
				}
				
			}
		});
		str+=data;
	});
	socket.on('end',function(){
		//console.log('got data:',str);
		//route函数，用于区分login操作或upload
		route(str);
	});
});
server.on('error',function(err){
	console.log('Server error:',err.message);
});
server.on('close',function(){
	console.log('Server closed.');
	var index = sockets.indexOf(socket);
	sockets.splice(index,1);
});
server.listen(4001);
console.log('4001端口监听启动，开始试题分发。');		
};
