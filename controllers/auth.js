module.exports = function(app, passport) {

  app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
  }));

  app.post('/login', passport.authenticate('local-login', {
          successRedirect : '/', // redirect to the secure profile section
          failureRedirect : '/', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
  }));

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));

  app.get('/auth/facebook/callback', passport.authenticate('facebook'),
    function(req,res){
      res.send(req.user.email);
  })


  app.post('/logout' , function(req,res){
      req.logout();
      res.redirect('/');
  });

}
