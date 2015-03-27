var net = require('net');
var server = net.createServer();
var sockets = [];

exports = function myServer(){
	return server;
};

server.on('error',function(err){
	console.log('Server error:',err.message);
});

server.on('close',function(){
	console.log('Server closed.');
	var index = sockets.indexOf(socket);
	sockets.splice(index,1);
});

server.listen(4001);