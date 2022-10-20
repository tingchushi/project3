require("dotenv").config();
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
const User = require("./models/Users.js");
const { mapReduce } = require("./models/Users.js");

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/api/seed", async (req, res) => {
  try {
    const seed = await User.create(
        {
          username: "admin",
          password: "pass",
        }
      );
      res.json(seed);
    } catch (error) {
    console.log(error);
  };
});

app.post("/api/login",async (req,res)=>{
  const { username, password, email } = req.body;  
  const hashedString = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const findUser =  await User.findOne({username})
  const findEmail = await User.findOne({email})
  const emailToValidate = email;
  const emailRegexp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

console.log(emailRegexp.test(emailToValidate));
  try {
    
    if(username === null || username.match(/^ *$/) !== null || password === null || password.match(/^ *$/) !== null){
      return res.send("invalid username/password");
    }

    if(!emailRegexp.test(emailToValidate)){
      return res.send("invalid Email");
    }

    if (findUser){
      return res.send("username existed");
    }

    if (findEmail){
      return res.send("email existed");
    }


        const newUser = await User.create(
          {
            username: username,
            email: email,
            password: hashedString,
          },
        )
        res.json(newUser);
    }
catch(error){
  console.log(error)
};
}) 

app.get("/api/login/authentication", async (req, res) => {

  const { username, password } = req.body;
  console.log(req.body);
try {
  const user = await User.findOne({ username });
  if (user === null) {
    res.status(401).json({ msg: "No user" });
    return;
  }

  const loginPass = bcrypt.compareSync(password, user.password);
  if (loginPass) {
    // res.status(200).json({ msg: "Login ok" });
    res.redirect("/")
  } else {
    res.status(401).json({ msg: "Not ok" });
  }
} catch (error) {
  res.status(500).json({ msg: "Server Error" });
}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
