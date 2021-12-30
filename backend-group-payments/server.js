const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();

// var corsOptions = {
//     origin: "http://localhost:3000"
//   };

const corsOptions ={
     origin:'*', 
     credentials:true,            //access-control-allow-credentials:true
     optionSuccessStatus:200,
  }
  
  app.use(cors(corsOptions))
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
app.get('/', (req,res)=>{
    res.json({message: "group payments application"})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
  
const db = require("./app/models");
const User = db.user
//const Group = db.group
db.mongoose
  .connect("mongodb+srv://"+process.env.USER+":"+process.env.PASSWORD+"@cluster0.vr65f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //initial()
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
// async function initial () {
//   const initialmem = ["firstuser"]
  
//       new Group({
//         key: "firstgroup",members: initialmem
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }
//         else{
//         console.log("added 'user' to roles collection");
//         }
//       });






