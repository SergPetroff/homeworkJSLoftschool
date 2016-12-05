(function(){
	
	var arrdata = [];
	var linkData = "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json";
	var source = document.getElementById("template").innerHTML;
    var container = document.getElementById("container");
    var templateFn = Handlebars.compile(source);

	loadJSON(linkData).then(function(result){
		arrdata = JSON.parse(result)
		//сортировка
		arrdata.sort(function(a,b){return a.name > b.name ? 1 : -1})

		container.innerHTML = templateFn({listcity:arrdata});
		return arrdata;
	}).then(arrdata => {
        inputField.addEventListener("input",function(event){ // ввод данных в input
                var value = event.target.value
                var result = filterdata(arrdata,value);
                container.innerHTML = templateFn({listcity:result});
        });
    });
})()

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