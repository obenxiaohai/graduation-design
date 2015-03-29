var access = require('./access.js'); 
var util = require('util'); 
var accessfile = './demo.mdb'; 
exports.Login = function(name,pwd,socket){
	 access.query({ 
		accessfile: accessfile, 
		sql: "SELECT password FROM demo WHERE id="+"'"+name+"'"
		}, function(data){
		var password;	
		try{
			password = data.records[0].password;
		}catch(e){

		}
		console.log('password:'+password+' '+'pwd:'+pwd);
		if(password == pwd){
			socket.write('ok');
			console.log('ok');
		}else{
			socket.write('notok');
			console.log('notok');
		} 
	}); 

};
//Login('2011310200801',123,'hello');


