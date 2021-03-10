$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

// Incomplete Favourites
// https://stackoverflow.com/questions/3626350/jquery-making-a-favorite-button-with-function

function addFav(){
  $.ajax({
    url: "/favorites/add",
    data: {"id": articleID},
    success: function(){
         $('a#fav')
               .addClass('active')
               .attr('title','[-] Remove from favorites')
               .unbind('click')
               .bind('click', removeFav)
         ;
    }
  });
}

function removeFav(){
  $.ajax({
    url: "/favorites/remove",
    data: {"id": articleID},
    success: function(){
          $('a#fav')
               .removeClass('active')
               .attr('title','[+] Add as favorite')
               .unbind('click')
               .bind('click', addFav)
          ;
    }
  });
}

//this will make the link listen to function addFav (you might know this already)
$('a#fav').bind('click', addFav);
