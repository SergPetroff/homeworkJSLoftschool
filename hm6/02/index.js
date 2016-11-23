(function(){
	var linkData = "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json";
	loadJSON(linkData).then(function(result){
		console.log(result)
	})
	
})();


function loadJSON(linkdata) {
	return new Promise(function(resolve,reject){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', linkdata, false);
		xhr.send();
		//console.log(xhr.responseText)	
		xhr.addEventListener('load',function() {
			resolve(xhr.responseText);
			console.log("aaaa")
		});
		xhr.addEventListener("error",function() {
			//console.log(xhr.responseText)
			reject()
		})
	})
}