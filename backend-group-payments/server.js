const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
  };

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

db.mongoose
  .connect("mongodb+srv://seconduser:F0udApcF0PCdmIIi@cluster0.vr65f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


