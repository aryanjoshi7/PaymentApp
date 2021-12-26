const db = require("../models");
var bcrypt = require("bcryptjs");
const User = db.user;

const signup = (req, res) => {
    const newuser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)});
    
    newuser.save((err, user)=>{
        if (err){
            res.status(500).send({message: err});
            return;
        }
    });    
    // get the user data from the req
    // have to add the user to the databse  
};
const signin = (req, res) => {
    const founduser = User.findOne({username: req.body.username},{password:1});
    if (founduser){
        var samepass = bcrypt.compareSync(req.body.password, founduser.password);
        if (samepass){
            var token = jwt.sign({ id: user.id }, config.secret, {
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
