(function(){
	
	var arrdata = [];
	var linkData = "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json";


	inputField.addEventListener("input",function(event){ // ввод данных в input
			var value = event.target.value
			var result = [];
				result = filterdata(arrdata,value)
			if (result.length>0) {
				
				/*Не могу понять как обновить DOM*/
			}
	})


	loadJSON(linkData).then(function(result){
		arrdata = JSON.parse(result)
		//сортировка
		arrdata.sort(function(a,b){return a.name > b.name ? 1 : -1})
		

		var source = document.getElementById("template").innerHTML;
	
		var container = document.getElementById("container");
		var templateFn = Handlebars.compile(source);
		var html = templateFn({listcity:arrdata});
		
		container.innerHTML = html;
	});



	
})()

function buildView(array){
	
	
}


function filterdata(array, searchval){
	var result =[];
			if(Array.isArray(array)){
			if (!searchval) {
				return array
			}else if (searchval.length < 1) {
				return array
			}else{
				return  array.filter(function(item) {
					return  item.name.toLocaleLowerCase().indexOf(searchval) !== -1

				})
			}
			
		}	
}

function loadJSON(linkdata) {
	return new Promise(function(resolve,reject){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', linkdata);
		xhr.send();
		
		xhr.addEventListener('load',function() {
			resolve(xhr.responseText);
			
		});
		xhr.addEventListener("error",function() {
			reject()
		})
	})
}