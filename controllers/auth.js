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

  app.post('/logout' , function(req,res){
      req.logout();
      res.redirect('/');
  });

}
