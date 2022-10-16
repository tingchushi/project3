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

app.get("/seed", async (req, res) => {
    try {
        const newUser = await User.create(
        [{
            username: "admin",
            password: "pass"
        }]);
        res.redirect("/")
    } catch(error){
        res.status(401).json({ msg: "No user" });
    }
})

app.get("/api/login",(req,res)=>{
    
})
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
