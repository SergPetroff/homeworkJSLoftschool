(function(){

	getListFriends()
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
		})
	}).then(function(){
		
	})
}