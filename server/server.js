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
  const { username, password } = req.body;  
  const hashedString = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  
  try {
      const newUser = await User.create(
        {
          username: username,
          password: hashedString
        }
      )
      bcrypt.compareSync(password, hashedString); 
      res.json(newUser);
    }
catch(error){
  console.log(error)
};
})

app.get("/api/login/authen", async (req, res) => {
  try {
    const foundUser = await User.find({
      username: req.body.username,
      password: req.body.password,
    });
    res.send(foundUser);
  } catch (error) {
    console.log(error);
  };
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
