console.log('wired up!')
console.log($)
console.log(_)
console.log(Backbone)

var containerEl = document.querySelector(".container")

var forEach = function(arr, cb){
   for(var i = 0 ; i < arr.length; i+=1){
      cb(arr[i], i, arr)
   }
}

var showHomePage = function(){
   var bigStr = '<div class="row">'
       bigStr += "<h3 class='whichUser'>Who's Watching?</h3>"

       for (var prop in  userList) {

         bigStr += '<div class= "col-sm-3">'
         bigStr += '<a href="#' + prop + '">'
         bigStr += '<div class="thumbnail">'
         bigStr += '<img src="http://flathash.com/' + prop + ' ">'
         bigStr += '<h4>' + userList[prop].username + '</h4>'
         bigStr += '</div>'
         bigStr += '</a>'
         bigStr += '</div>'
   }
         bigStr += '</div>'

         containerEl.innerHTML = bigStr
}

function showUserPage(user){
   var userObj = userList[user]

   var bigStr = '<h3 class="home"> <a href="#"><i class="fa fa-home" aria-hidden="true"></i></a> </h3>'
      bigStr += '<h3 class="userName"><span>' + userObj.username + '\'s </span> List </h3>'
      bigStr += '<div class="row showsEl"> </div>'

      containerEl.innerHTML = bigStr

   var showId = userObj.showIds[0]

   forEach(userObj.showIds, function(showIdNum){

      $.getJSON("http://api.tvmaze.com/shows/" + showIdNum).then(function(incomingData){


         var showsListContainer = document.querySelector('.showsEl')

         var bigStr = '<div class="col-sm-2">'
            bigStr += '<img src="' + incomingData.image.medium +  '" alt="">'
            bigStr += '<h5>' + incomingData.name + '</h5>'
            bigStr += '</div>'

         showsListContainer.innerHTML += bigStr

      })

   })

}

var userList = {
   matt: {username: "Matt", showIds: [170,169,175,318,76,270, 255]},
   ed: {username: "Ed", showIds: [5853,431,80,279,570,76,73,20540,83,17119]},
   michelle: {username: "Michelle", showIds: [83,576,735,73,749,170,112,80]},
   justin: {username: "Justin", showIds: [551,169,490,530,73,302, 547, 532]},

}

var routerController = function(){
   var userPage = window.location.hash.slice(1)

   if(userPage.length === 0){
      showHomePage()
      return
   }

   showUserPage(userPage)
}

window.addEventListener('hashchange', routerController)
routerController()
