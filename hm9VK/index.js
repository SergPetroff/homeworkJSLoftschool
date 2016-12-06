(function(){

	getListFriends()
	
	var leftclick = document.getElementById("leftcontentlist");
	leftclick.addEventListener("click",function(event){
		let thisEl = event.target.parentElement;
		userid = thisEl.dataset.userid;
		console.log(getobjUser(userid));

	})
})();

function getListFriends(){
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
			var source = document.getElementById("lefttemplate").innerHTML;
    		var lefttcontainer = document.getElementById("leftwraptemplate");
    		var leftttemplateFn = Handlebars.compile(source);
		return new	Promise(function(resolve,reject){
			VK.api("users.get",{'name_case':'gen'},function(response){
				var userdata = response.response[0];
				
			})
			VK.api('friends.get',{'fields': 'bdate, photo_50'},function(response){
				var listFriends = response.response;

					listFriends.sort(function(a,b){return a.last_name>b.last_name ? 1 : -1})
					
					lefttcontainer.innerHTML = leftttemplateFn({listfriends:listFriends});
			})
			resolve();
		})
	}).then(function(){
		
	})
}

function addFavoriteList(objFraind){

}

function getobjUser(userid){
	var objUser;
		VK.api('friends.get',{'fields': 'bdate, photo_50'},function(response){
				var listFriends = response.response;
					objUser =  listFriends.filter(function(item){
					return item.user_id == userid?item:null;
				})
				console.log(objUser)
			})
		
	return objUser;
}