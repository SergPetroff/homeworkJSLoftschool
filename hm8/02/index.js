(function(){
	var source = document.getElementById("templatevkfriends").innerHTML;
    var container = document.getElementById("fortamplate");
    var templateFn = Handlebars.compile(source);

	new Promise(function(resolve,reject){
		VK.init({
		    apiId: 5758326
		  });
		VK.Auth.login(function(response){
			if(response.session){
				resolve(response)
			}else{
				reject(new Error('Не удалось авторизоваться'));
			}
		});
	},2).then(function(){
		return new Promise(function(resolve,reject){
			VK.api("users.get",{'name_case':'gen'},function(response){
				var userData = response.response[0]
				headerinfo.textContent = `Друзья ${userData.first_name} ${userData.last_name}`;
			});
		})
	})


	new Promise(function(resolve,reject){
		VK.api('friends.get',{'fields': 'bdate, photo_50'},function(response){			
			if(response.error){
				reject(new Error("Не удалось получить данные"))
			}else{
				
				var allFriends = response.response
				//выбираем тех у кого заполнено ДР
				var fullBDate = allFriends.filter(function(item){ 
					return item.bdate?item:null
				});
				// Сортируем по дате
				fullBDate.sort(function(a,b){ 
					var adate = new Date(new Date().getFullYear(),a.bdate.split(".")[1]-1,a.bdate.split(".")[0]);
					var bdate = new Date(new Date().getFullYear(),b.bdate.split(".")[1]-1,b.bdate.split(".")[0]);
					return adate>bdate?1:-1;
				});
				// выбираем тех у кого будет ДР в этом году
				willbeBD = fullBDate.filter(function(item){ 
					var odate = new Date(new Date().getFullYear(),item.bdate.split(".")[1]-1,item.bdate.split(".")[0]);
					var today = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
					 return odate>today?item:null
				});
				// выбираем тех у кого было ДР
				beforeBdate = fullBDate.filter(function(item){ 
					var odate = new Date(new Date().getFullYear(),item.bdate.split(".")[1]-1,item.bdate.split(".")[0]);
					var today = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
					 return odate<today?item:null
				});
				//Те у кого не заполнено ДР
				emptyBD = allFriends.filter(function(item){return !item.bdate?item:null})
				// соединяем
				var resultarr =willbeBD.concat(beforeBdate).concat(emptyBD)
				container.innerHTML = templateFn({listfriends:resultarr});
				resolve()
			}
		})
	})
})()
