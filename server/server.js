require("dotenv").config();
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
const User = require("./models/Users.js")

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
  // console.log(req.body);
  // console.log(req.body.username)
  // console.log(User.find(req.body.username))
  const findUser =  await User.find({}, {username})
  findUser.forEach ((e) => { 
    const comp = e.username
    // console.log(comp)
  })
  
  // console.log(findUser);
  // console.log(compareUser)

  try {
      if (findUser !== comp){
        const newUser = await User.create(
          {
            username: username,
            email: email,
            password: hashedString,
          },
        )
        bcrypt.compareSync(password, hashedString); 
        res.json(newUser);
      } else {
        res.json("duplicated")
      }
      // findUser = null;
      // console.log(findUser)
    }
catch(error){
  console.log(error)
};
})

app.get("/api/login/authentication", async (req, res) => {
  try {
    const foundUser = await User.find({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    res.send(foundUser);
  } catch (error) {
    console.log(error);
  };
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
