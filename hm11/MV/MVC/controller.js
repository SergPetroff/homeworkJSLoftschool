var Controller = {
    musicRoute: function() {
        return Model.getMusic().then(function(music) {
            results.innerHTML = View.render('music', {list: music});
        });
    },
    friendsRoute: function() {
        return Model.getFriends().then(function(friends) {

            results.innerHTML = View.render('friends', {list: friends});
        });
    },
    newsRoute: function() {
        return Model.getNews().then(function(news) {
            
            results.innerHTML = View.render('news', {list: news.items});
        });
    },
    groupsRoute:function(){
        return Model.getGroups().then(function(groups){
            console.log(groups)
            results.innerHTML = View.render('groups', {list: groups});
        })
    },
    photoRoute:function(){
        return new Promise(function(resolve,reject){
                Model.getPhoto().then(function(photo){
                  if(Array.isArray(photo)){
                    resolve(photo)
                  }
                })
        }).then(function(arrphoto){
            let strOwnPid = "";
            arrphoto.forEach(function(item){
                
                if(typeof item === 'object'){
                    strOwnPid += item.owner_id+"_"+item.pid+",";
                }
            })

            return new Promise(function(resolve,reject){
                Model.getCounCommentPhoto(strOwnPid).then(function(arrcoments){
                    
                    arrphoto.forEach(function(itemfoto){
                        arrcoments.forEach(function(itemcomment){
                            if (itemfoto.pid ===itemcomment.pid) {
                                itemfoto.countcomments = itemcomment.comments.count;
                            }
                        })
                    })                    
                      
                    resolve(arrphoto)
                    
                 })
            })
            
        }).then(function(arrphoto){
            results.innerHTML = View.render('photo', {list: arrphoto});
        })
        
    }
};
