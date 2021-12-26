const db = require("../models");
const User = db.user;


checkDuplicateUser = (req, res, next) => {
    if (User.findOne({username: req.body.username}, function(err,result){
        if (err){
            res.status(500).send({message: err});
            return;
        }
        if (result){
            res.status(400).send({message: "Username already exists"});
            return;
        }
    }))
    if (User.findOne({email: req.body.email}, function(err,result){
        if (err){
            res.status(500).send({message: err});
            return;
        }
        if (result){
            res.status(400).send({message: "Email already exists"});
            return;
        }
    }))
    next();
};


const verifySignUp = {
    checkDuplicateUsernameOrEmail
  };
  
module.exports = verifySignUp;