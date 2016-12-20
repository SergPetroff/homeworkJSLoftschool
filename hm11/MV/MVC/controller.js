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
        return Model.getPhoto().then(function(photo){
            console.log(photo) 
            var testcomment = Model.getCommentPhoto().then(function(ocomment){
                console.log(ocomment)    
            })
           /* for (var i = 0; i < photo.length; i++) {
                if (typeof photo[i] === 'object') {
                   
                }
                
            }*/
            results.innerHTML = View.render('photo', {list: photo});
        })
    }
};
