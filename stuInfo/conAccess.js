var access = require('./access.js'); 
var util = require('util'); 
var fs = require('fs');
var accessfile = './demo.mdb';
var examPath = './exam/';
var paperID = 1;
exports.toStoreScore = function(sumGrade,paperID){
	var paperid = parseInt(paperID);
	access.execute({ 
	accessfile: 'demo.mdb', 
	//sql: "UPDATE demo SET paperID = "+paperid+" WHERE id ="+"'"+id+"'"
	sql: util.format("UPDATE demo SET score =%d WHERE paperID =%d",+sumGrade,+paperid)
	}, function(data){ 
	//console.log(data); 
	}); 
};
exports.Login = function(name,pwd,socket){
	 access.query({ 
		accessfile: accessfile, 
		//sql: "SELECT password FROM demo WHERE id="+"'"+name+"'"
		sql: util.format("SELECT password FROM demo WHERE id='%s'",+name)
		}, function(data){
		var password;	
		try{
			password = data.records[0].password;
		}catch(e){

		}
		console.log('password:'+password+' '+'pwd:'+pwd);
		if(password == pwd){

			(function(paperID,name){
				fs.readFile(examPath+paperID+'.json','utf8',function(err,data){
					if (err) throw err;
				socket.write('ok@#$'+paperID+'@#$'+data+'@#$');
				givePaperID(paperID,name)
				//console.log('ok');
			});
			})(paperID,name);

			paperID++;
		}else{
			socket.write('notok');
			//console.log('notok');
		} 
	}); 

};
//Login('2011310200801',123,'hello');
function givePaperID(paperID,id){
	var paperid = parseInt(paperID);
	access.execute({ 
	accessfile: 'demo.mdb', 
	//sql: "UPDATE demo SET paperID = "+paperid+" WHERE id ="+"'"+id+"'"
	sql: util.format("UPDATE demo SET paperID =%d WHERE id ='%s'",+paperid,+id)
	}, function(data){ 
	//console.log(data); 
	}); 
}


