(function(){

	getListFriends()
	
	var leftclick = document.getElementById("leftcontentlist");
	/*leftclick.addEventListener("click",function(event){
		let thisEl = event.target.parentElement;
		userid = thisEl.dataset.userid;
		addFavoriteList(userid,thisEl);

	})*/
	wrapcontent.addEventListener("click",function(event){
		var  thisEl = event.target;
		var thisListUl = thisEl.closest("ul")

		console.log(thisListUl.offsetTop)
		/*if (!thisEl.closest("a").dataset.userid) {
			console.log(event.target)
		}*/
		var userid = thisEl.closest("li").dataset.userid;
		
		
		if (thisListUl.id ==="leftlist") {
			addFavoriteList(userid,thisEl);
		}else if(thisListUl.id ==="rightlist"){
			removeFromFavoritelist(userid,thisEl)
		}
	})



})();




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
					lefttcontainer.innerHTML = leftttemplateFn({listfriends:listFriends});
					resolve(listFriends);
			})
			
		})
	}).then(function(arrayusers){ // фильтр левого блока
		searchbar.addEventListener("input",function () {
			var currInput = event.target;
			if(currInput.id ==="leftinput"){
				lefttcontainer.innerHTML = leftttemplateFn({listfriends:filterdata(arrayusers,currInput.value)});
			}
			
		})
	})
}


function addFavoriteList(userid,elem){
	return new Promise(function(resolve,reject){
		var elemli = elem.closest("li");
		rightlist.appendChild(elemli)
		//leftlist.removeChild(elem.closest(".useritem"))
		/*VK.api('friends.get',{'fields': 'bdate, photo_50'},function(response){
				var listFriends = response.response;
						objUser =  listFriends.filter(function(item){
						return item.user_id == userid?item:null;
					})

				resolve(objUser)
			})*/
	}).then(function(resolve){
		/*var elli = document.createElement("li");
			elli.className = "useritem";
		var elimguser =document.createElement("img");
			elimguser.className ="img-circle";
			elimguser.src = resolve[0].photo_50;
		var ela = document.createElement("a");
			//ela.className ="img-circle";
			ela.href = "#";
			ela.dataset.userid = resolve[0].user_id;
		var elpersonname = document.createElement("span");
			elpersonname.className = "personname";
			elpersonname.innerHTML = resolve[0].last_name +" "+ resolve[0].first_name;
		var imgplus = document.createElement("span");
			imgplus.className = "glyphicon glyphicon-remove";
		
		ela.appendChild(imgplus)
		elli.appendChild(elimguser);
		elli.appendChild(elpersonname);
		elli.appendChild(ela)
		rightlist.appendChild(elli)*/
		
	})
}

function removeFromFavoritelist(userid,elem) { //удаление из списка избранных
	return new Promise(function(resolve,reject){
		var indexinlist = parseInt(elem.closest("li").id,10) +1;
		var elemli = elem.closest("li");
		var	allli = leftlist
		var refli =  leftlist.querySelector('li[id="'+indexinlist+'"]'); // нужно сделать перебор пока ненайдется ближайший сосед;
		console.log(refli)
		leftlist.insertBefore(elemli,refli)
		//console.log(indexinlist,getprevli)
		//rightlist.removeChild(elem.closest(".useritem"))
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
					  if(item.last_name.toLocaleLowerCase().indexOf(searchval.toLocaleLowerCase()) !== -1){
						return	item
						}

				})
			}
			
		}	
}

