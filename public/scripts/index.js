$(document).ready(function(){

  $('#registerBtn').click(function(){
    $.post('/register', {username : $('#username').val() , password : $('#password').val()}, function(){
        location.reload();
    });
  });

  $('#loginBtn').click(function(){
    $.post('/login', {username : $('#username').val() , password : $('#password').val()}, function(){
        location.reload();
    });
  });

  $('#facebookBtn').click(function(){
    $.get('/auth/facebook');
  });

  $('#logoutBtn').click(function(){
    $.post('/logout', function(req,res){
        location.reload();
    });
  })

});
