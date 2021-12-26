const jwt = require("jsonwebtoken")
const db = require("../models");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config")
const User = db.user;

const signup = (req, res) => {
    
    const newuser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)});
   
    
    res.status(200).send({message: "Added Properly"});
    
    newuser.save((err, user)=>{
        if (err){
            res.status(500).send({message: err});
            return;
        }
    });    
    //
    // get the user data from the req
    // have to add the user to the databse  
};
const signin = async (req, res) => {
    const founduser = await User.findOne({username: req.body.username});
    console.log(req.body.password)
    if (founduser.password){
        //var samepass = bcrypt.compareSync(req.body.password, founduser.password);
        if (founduser.password == req.body.password){
            var token = jwt.sign({ id: founduser.id }, config.secret, {
                expiresIn: 86400 // 24 hours
              });
            res.status(200).send({
                username: founduser.username,
                email: founduser.email,
                password: req.body.password,
                accessToken: token
              });
        }
        else{
            return res.status(401).send({accessToken: null, message: "Invalid Password!"});
        }
    }
    else{
        return res.status(404).send({ message: "User Not found." });
    }
};


module.exports = {
    signup,
    signin
}
