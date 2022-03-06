const db = require("../models");
const User = db.user;
const Groups = db.group;

checkDuplicateUser = (req, res, next) => {
    User.findOne({
        username: req.body.username
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        if (user) {
          res.status(400).send({ message: "Failed! Username is already in use!" });
          return;
        }
    
        // Email
        User.findOne({
          email: req.body.email
        }).exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
          }
    
          next();
        });
      });
    };
checkDuplicateGroup = (req, res, next) => {
  console.log(req.body.group)
  Groups.findOne({
      key: req.body.group
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(400).send({ message: "Failed! Group Already Exists" });
        return;
      }
      if (!user){
        next();
      }
  
    
    });
    
  };
//need to finish this add header possibley instead of message body because get
checkMember = (req,res,next) => {
  Groups.findOne({
    key: req.params.id
  }).exec((err, foundgroup) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (foundgroup && foundgroup.members.includes(req.username) ) {
      //res.status(200).send("Group Content.");
      next();
      return;
    }
    else {
      res.status(401).send({ message: "Either No Such Group or not in group" });
      return;
    }

  
  });




  // const foundgroup = await Groups.findOne({key: req.params.id});
  // if (!foundgroup.key){
  //   return res.status(401).send({message: "Group does not exist"});
  // }
  // if (foundgroup.key){
  //   if (foundgroup.members.includes(req)){
  //     res.status(200).send("Public Content.");
  //     return;
  //   }
  //   else{
  //     res.status(401).send({ message: "Either No Such Group or not in group" });
  //     return;
  //   }
  // }
  // res.status(401).send({ message: "Either No Such Group or not in group" });
  // return;
};


const verifySignUp = {
    checkDuplicateUser,
    checkDuplicateGroup,
    checkMember
  };
  
module.exports = verifySignUp;