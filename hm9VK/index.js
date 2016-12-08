(function(){

	//загрузка списка
	getListFriends()
	
	//Добавление в список по кнопке
	wrapcontent.addEventListener("click",function(event){
		var  thisEl = event.target;
		
		var thisListUl = thisEl.closest("ul")
		var userid = thisEl.closest("li").id;
		
		
		if (thisListUl.id ==="leftlist" && thisEl.tagName === "SPAN") {
			addFavoriteList(userid,thisEl);
		}else if(thisListUl.id ==="rightlist" && thisEl.tagName === "SPAN"){
			removeFromFavoritelist(userid,thisEl)
		}
	});
	// Сохранение данных в localstorage
	savebtn.addEventListener("click",savelocalstorage)	
})();

function savelocalstorage(){
	return new Promise(function(resolve,reject){
		//сохранение выбранных друзей
		if(rightlist.getElementsByTagName("li").length >0){
			// Сохранение выбранных друзей
			let htmllist = rightlist.innerHTML;
			localStorage.favoriteListFrainds = htmllist;

			// Сохранение основного списка
			let CurrentAllList = leftlist.getElementsByTagName("li")
			let arrayListFrainds = [];
			
			for (var i = 0; i < CurrentAllList.length; i++) {
				arrayListFrainds.push(CurrentAllList[i].dataset.userid)
			}

			VK.api('friends.get',{'fields': 'bdate, photo_50'},function(response){
						listFriends = response.response;
						listFriends.sort(function(a,b){return a.last_name>b.last_name ? 1 : -1})
						listFriends.map(function(item,index) {return item.index = index});

						listFriends = listFriends.filter(function(item){
							if (arrayListFrainds.indexOf(item.user_id+"") !== -1) {
								return item
							}
						})
						localStorage.allListFrainds = JSON.stringify(listFriends);
				})
		}else{
			localStorage.removeItem("favoriteListFrainds");
			localStorage.removeItem("allListFrainds");
		}
		resolve()
	}).then(function(){
		window.alert("Данные сохранены!")
	})
}


//drag and drop
function dragStart(ev) {
   ev.dataTransfer.effectAllowed='move';
   ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
   return true;
}
function dragEnter(ev) {
   event.preventDefault();
   return true;
}
function dragOver(ev) {
    event.preventDefault();
}

function dragDrop(ev) {
   var data = ev.dataTransfer.getData("Text");
  	if (document.getElementById(data)) {
  		ev.target.appendChild(document.getElementById(data));
 		ev.stopPropagation();

 		//меняем plsu на remove
   		var listli = rightlist.getElementsByTagName('li')
   		for (var i = 0; i < listli.length; i++) {
   				listli[i].getElementsByTagName('SPAN')[1].className="glyphicon glyphicon-remove";
   			}	
   		return false;	
 	}

}

function getListFriends(){ // Загрузка списка друзей
	var source = document.getElementById("lefttemplate").innerHTML;
	var lefttcontainer = document.getElementById("leftwraptemplate");
	var leftttemplateFn = Handlebars.compile(source);
	var listFriends;
	return new Promise(function(resolve,reject){
		VK.init({
			apiId: 5758326
		});
		VK.Auth.login(function(response){
			if(response.error){
				reject(new Error('Не удалось авторизоваться'));
			}else{
				resolve(response)
			}
		})
	},2).then(function(){


		return new	Promise(function(resolve,reject){
			VK.api("users.get",{'name_case':'gen'},function(response){
				var userdata = response.response[0];
				
			})
			
			VK.api('friends.get',{'fields': 'bdate, photo_50'},function(response){
						listFriends = response.response;
						listFriends.sort(function(a,b){return a.last_name>b.last_name ? 1 : -1})
						listFriends.map(function(item,index) {
							return item.index = index;
						})
						if (localStorage.allListFrainds) { // Если есть сохраненные данные в localstorage, загружаем оттуда.
							lefttcontainer.innerHTML = leftttemplateFn({listfriends:JSON.parse(localStorage.allListFrainds)});
							rightlist.innerHTML = localStorage.favoriteListFrainds;

						}else{
							lefttcontainer.innerHTML = leftttemplateFn({listfriends:listFriends});		
						}
						
						resolve(listFriends);
				})
			
			
		})
	}).then(function(arrayusers){ 
		searchbar.addEventListener("input",function () { // поиск по основному списку
			var currInput = event.target;
			if(currInput.id ==="leftinput"){
				lefttcontainer.innerHTML = leftttemplateFn({listfriends:filterdata(arrayusers,currInput.value)});
			}
			
		});
		searchbar.addEventListener("input",function () { // поиск по списку выбранных
			var currInput = event.target;
			if(currInput.id ==="rightinput"){
				var listli = rightlist.getElementsByTagName('li')
				for (var i = 0; i < listli.length; i++) {
					let fullusername = listli[i].getElementsByTagName('SPAN')[0].innerHTML;
					if(fullusername.split(" ")[0].toLocaleLowerCase().indexOf(currInput.value.toLocaleLowerCase())!== -1 ||
						fullusername.split(" ")[1].toLocaleLowerCase().indexOf(currInput.value.toLocaleLowerCase())!== -1){
						
						listli[i].style.display = 'list-item';
					}else{
						listli[i].style.display = 'none';
					}
				}
			}
			
		})
	})
}


function addFavoriteList(userid,elem){
	return new Promise(function(resolve,reject){
		var elemli = elem.closest("li");
		var icobtn = elemli.getElementsByTagName('SPAN')[1];
			icobtn.className="glyphicon glyphicon-remove";
		rightlist.appendChild(elemli);
		
	})
}

function removeFromFavoritelist(userid,elem) { //удаление из списка избранных
	return new Promise(function(resolve,reject){
		var indexinlist = parseInt(elem.closest("li").id,10) +1;
		var elemli = elem.closest("li");
		var icobtn = elemli.getElementsByTagName('SPAN')[1];
			icobtn.className="glyphicon glyphicon-plus";
		var	allli = leftlist
		while(leftlist.querySelector('li[id="'+indexinlist+'"]') === null){ // если записи с тайим ИД нет, то ищем ближайшую.
			indexinlist++
		}
		var refli =  leftlist.querySelector('li[id="'+indexinlist+'"]'); 
		leftlist.insertBefore(elemli,refli)
	})
	
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
					  if(item.last_name.toLocaleLowerCase().indexOf(searchval.toLocaleLowerCase()) !== -1 ||
					  	item.first_name.toLocaleLowerCase().indexOf(searchval.toLocaleLowerCase()) !== -1
					  	){
						return	item
						}

				})
			}
			
		}	
}

