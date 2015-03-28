exports.route = function(str){
	var toPath;
		//这里有一个事实：如果传入的字符串没有@#$，
		//那么数组长度为1，arr[1]的值为undifined.
		//如果有@#$，且冒号后面没有内容，那么arr[1]==""
	toPath = str.split('@#$');
	//login:
	//"login:jia:pasword"
	//upload:
	//"upload:jia:ans"
	//uploadAll:
	//"uploadAll:jia:ans"
	switch(toPath[0]){
		case 'login' : return toLogin(toPath[1],toPath[2]);
		case 'upload': return toUpload(toPath[1],toPath[2]);
		case 'uploadAll':return toUploadAll(toPath[1],toPath[2]);
		default : return 'err';
	}
}

function toLogin(name,password){
	return 'ok';
}
function toUpload(name,ans){
	return 'record';
}
function toUploadAll(name,ans){
	return 'recordAll';
}
