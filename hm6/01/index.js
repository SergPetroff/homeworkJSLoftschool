(function(){

	timer(3000).then(function(){console.log("прошло 3 секунды")})
})()



function timer(milsec){
	return new Promise(function(resolve,reject){
		setTimeout(function(){
			resolve()
		},milsec)
	});
	
}