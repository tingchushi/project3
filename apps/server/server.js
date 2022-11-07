require("dotenv").config();
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const session = require("express-session");
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
const User = require("./models/Users.js");
const Item = require("./models/Items.js");
const Cart = require('./models/Cart.js');
const cors = require('cors');

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(cors());
app.use(express.static("../client/client/dist"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//seed
app.get("/api/seed", async (req, res) => {
  try {
    const seed = await User.create(
        {
          username: "user",
          email: "user",
          password: bcrypt.hashSync("user", bcrypt.genSaltSync(10)),
          role: "user"
        }, 
        {
          username: "admin",
          email: "admin",
          password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
          role: "admin"
        }
      );
      res.json(seed);
    } catch (error) {
    console.log(error);
  };
});

//view all user
app.get('/api/all', async (req,res)=>{
  const all = await User.find({});
  res.status(200).json({msg:all})
})

app.get("/api/all/:id", async (req, res) => {
    const { id } = req.params;
 
    try {
        const userI = await User.findById(id).exec();
        if (userI === null) {
          res.status(404).json({ error: "Not found" });
        } else {
          res.status(200).json(userI);
        }
      } catch (error) {
        res.status(500).json(error);
      }
    });

//signup
app.post("/api/signup",async (req,res)=>{
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
      res.status(204).json({ message: "Something went wrong" });
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

//login auth
app.post("/api/login", async (req, res) => { 

  const { username, password } = req.body;
 
try {
  const user = await User.findOne({ username });
  if (user === null) {
    res.status(401).json({ msg: "No user" });
    // console.log(user);
    return;
  }

  const loginPass = bcrypt.compareSync(password, user.password);
  if (loginPass) {
    req.session.userid = user._id;
    const details = await User.find({username: username});
    const findRole = details[0].role;
    console.log(findRole)
    // const findRole = details.role;
    // console.log(findRole)
    let token = details[0]._id;
    console.log(token);
    if(findRole === "admin"){
     return res.status(200).json({msg: "admin", token})
    }
    if(findRole === "supervisor"){
      return res.status(200).json({msg: "admin", token})
     }
     if(findRole === "user"){
      return res.status(200).json({msg: "admin", token})
     }
    res.redirect("/");
  } else {
    res.status(401).json({ msg: "Not ok" });
  }
} catch (error) {
  res.status(500).json({ msg: "Server Error" });
}
});

//update for admin and supervisor
app.put("/api/edit/:id", (req, res) => {
  const { role } = req.body;
  if (req.body.role === "admin" || req.body.role === "supervisor" || req.body.role === "user"){

    User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, updatedUser) => {
        if (err) {
          res.status(400).json({ error: err.message });
        }
        res.status(200).json(updatedUser);
      })
      return;
    }else {
      return res.status(400).json({msg:"wrong input"})
    }
});

//delete user
app.delete("/api/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(id);

    if (deleteUser === null) {
      res.status(400).json({ msg: "Wrong ID" });
    } else {
      res.status(200).json(deleteUser);
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

//logout user and destroy session
app.post('/logout', (req, res) => {
  // req.logout();
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    res.send('Logged out');
  });
});

//Show all item
app.get(("/api/item"), async(req,res)=>{
  const showAll = await Item.find({});
  res.status(200).json(showAll)
})

//Add item
app.post("/api/additem", async (req, res) => {
  const { name, description, price } = req.body;  
  try {
    const newItem = await Item.create(
      {
        name: name,
        description: description,
        price: price,
      }
    )
    res.json(newItem);
}
catch(error){
console.log(error)
}});

//Update item
app.put("/api/updateitem/:id", (req, res) => {
  const { name, description, price } = req.body;
  if (req.body){
    Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      // { new: true },
      (err, updatedItem) => {
        if (err) {
          res.status(400).json({ error: err.message });
        }
        res.status(200).json(updatedItem);
      })
      return;
    }else {
      return res.status(400).json({msg:"wrong input"})
    }
});

//Delete item
app.delete("/api/deleteItem/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await Item.findByIdAndDelete(id);

    if (deleteUser === null) {
      res.status(400).json({ msg: "Wrong ID" });
    } else {
      res.status(200).json(deleteUser);
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
8

//Add item to Cart
app.post("/api/cart/create", async (req, res) => {
  const { userId, itemId } = req.body;  
  try {
    const newCart = await Cart.create(
      {
        userId: userId,
        itemId: itemId
      }
    )
    res.json(newCart);
}
catch(error){
console.log(error)
}});

// Show all Cart
app.get('/api/cart/all', async (req,res) => {
  const allCart = await Cart.find().populate('itemId').exec();
  res.status(200).json(allCart)
})

app.get('/api/cart/all/:id', async (req,res) => {
  const id = req.params.id;
  console.log(id);
  const allCart = await Cart.find({ userId : id }).populate('itemId').exec();
  res.status(200).json(allCart)
})

app.delete("/api/cart/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await Cart.findByIdAndDelete(id);

    if (deleteUser === null) {
      res.status(400).json({ msg: "Wrong ID" });
    } else {
      res.status(200).json(deleteUser);
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
 
mongoose.connection.on('connecting', () => { 
  console.log('connecting')
  console.log(mongoose.connection.readyState); //logs 2
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})