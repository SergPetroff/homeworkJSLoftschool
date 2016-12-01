(function(){
		

	if (document.cookie.length === 0) {
		writeCookies()	
	}

	buildCokieTable()

	var tbody= document.getElementById('tbody');


	//удаление куки
	tbody.addEventListener("click",function(ev){
		var valCookie = ev.target.value.trim();
			if(confirm("Удалить куку "+ valCookie + "?")){
				deleteCookies(valCookie)
				buildCokieTable();
			}
		
	})

	// создание куки
	var formCookie = document.getElementById("sendCookie"),
		nameNewCookie = document.getElementById("nameCookie"),
		valNewCookie = document.getElementById("valCookie"),
		expNewCookie = document.getElementById("experCookie");

	var	alerdiv = document.createElement("div"); // создаем алерт
		alerdiv.id="idalert";
		alerdiv.className = "alert alert-success";
		alerdiv.innerHTML = "<strong>Внимение!</strong> Заполните все поля!.";

	formCookie.addEventListener("click", function (event) { 
		if(event.target.id === "btnNewCook"){
			var arrInputs = document.getElementsByClassName("inputnewCookie")
			if(!validateField(arrInputs)){
				formCookie.appendChild(alerdiv) // выводим алерт
			}else{
				if(document.getElementById("idalert")){
					formCookie.removeChild(alerdiv) // закрываем алерт	
				}
				
				createCookie(nameNewCookie.value,valNewCookie.value,expNewCookie.value) // добавляем куку
				buildCokieTable() // пересобираем таблицу
			}
			
		}
		
	})
})();


function writeCookies(){ // Создание тестовых кук
 var arrCookies = ["NameCookie1=val1","NameCookie2=val2","NameCookie3=val3","NameCookie4=val4","NameCookie5=val5"];
 	for(cookie of arrCookies){
 		document.cookie = cookie;
 	}
}

function buildCokieTable(){ // построение DOM
	var allCookies = document.cookie;
	var arrallcookies = allCookies.split(";");
	var tbody= document.getElementById('tbody');

	var thtable = arrallcookies.map((itemcookie,index) => `<tr id="${'tr-'+index}"><td >${itemcookie.split('=')[0]}</td><td>${itemcookie.split('=')[1]}</td><td><button id="${'btn-'+index}" value="${itemcookie.split('=')[0]}" class='btnDel'>Delete</button></td><tr>`).join('\n');

	tbody.innerHTML = thtable;
}

function deleteCookies(name){ // удаление куки
	document.cookie =name+ '=; expires = Thu, 01 Jan 1970 00:00:01 GMT;';
}

function createCookie(name,value,days) { // создание куки
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires;
}

function validateField(array) {
	
	for(inputfld of array){
		if(inputfld.value.length ===0){
			return false
		}
	}
	return true
}