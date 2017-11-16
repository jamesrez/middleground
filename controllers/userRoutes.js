var User = require('../models/user.js');
module.exports = function(router) {

  //Make a New User
  router.post('/:id/new', function(req,res,next){
    var user = new User({id : req.params.id, name : req.body.name});
    user.save(function(err,user){
      console.log("New User: " + user.name + ", " + user.id);
      next();
    })
  })

  //POST to User's Labels
  router.post('/:id/labels', function(req,res, next){
    User.findOne({id : req.params.id}, function(err,user){
      user.labels.age = (req.body.age ? req.body.age : user.labels.age);
      user.labels.politics = (req.body.politics ? req.body.politics : user.labels.politics);
      user.labels.race = (req.body.race ? req.body.race : user.labels.race);
      user.labels.gender = (req.body.gender ? req.body.gender : user.labels.gender);
      user.labels.sexuality = (req.body.sexuality ? req.body.sexuality : user.labels.sexuality);
      user.labels.religion = (req.body.religion ? req.body.religion : user.labels.religion);
      user.save(function(err,user){
        console.log("User " + user.name+ " #" + user.id + "'s labels have been updated'");
        next();
      })
    })
  });

  //Get a User's Name
  router.get('/:id/name', function(req, res){
    User.findOne({id : req.params.id}, function(err, user){
      res.json(user.name);
    })
  })

  //Get a User's Labels
  router.get('/:id/labels', function(req, res){
    User.findOne({id : req.params.id}, function(err, user){
      res.json(user.labels);
    })
  })


}
