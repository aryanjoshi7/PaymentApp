const db = require("../models");
const User = db.user;
const Groups = db.group;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
exports.createGroup = async (req, res) => {
    const firstmember = [req.body.username];
    const newgroup = new Groups({
        key: req.body.group,
        members: firstmember
        });
    
    newgroup.save((err, user)=>{
        if (err){
            res.status(500).send({message: err});
            return;
        }
    });
    let founduser = await Groups.findOne({username: req.username});
    const grouplist = founduser.adminofgroups.push(req.body.group);
    var newvalue = {$set: {adminofgroups: grouplist}};
    User.updateOne({username: req.username}, newvalue, function(err,res){
      if (err) {
      res.status(500).send({ message: err });
      return;
      }
    });
    res.status(200).send({message: "Added Properly"});
    return;
  };
// exports.grouppage = (req, res) => {
  
//  };
