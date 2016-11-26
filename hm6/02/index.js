(function(){
	var arrdata = [];
	var linkData = "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json";

	inputField.addEventListener("input",function(event){ // ввод данных в input
			var value = event.target.value
			buildView(filterdata(arrdata,value))
	})

	
	loadJSON(linkData).then(function(result){
		arrdata = JSON.parse(result)
		//сортировка
		arrdata.sort(function(a,b){return a.name > b.name ? 1 : -1})

		buildView(filterdata(arrdata))
	});

	
	
})();


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

function buildView(array){
	while (container.firstChild) {  // очистка ДОМ
    	container.removeChild(container.firstChild);
	}
	for (var i = 0; i < array.length; i++) { // построение ДОМ
			 var divItem = document.createElement('div'); 
  				divItem.innerHTML = array[i].name;
				container.appendChild(divItem)
			}	
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