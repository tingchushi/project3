// require("dotenv").config();
// const express = require('express');
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const mongoose = require('mongoose');
// const MONGO_URI = process.env.MONGO_URI;
// mongoose.connect(MONGO_URI);
// const User = require("../server/models/User.js")

// const app = express()
// const port = process.env.PORT ?? 3000;
// const saltRounds = 10;

// app.use(cors());
// app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get("/api/users/seed", async (req, res) => {
//   await User.deleteMany({});
//   // bcrypt.hash("123", saltRounds, async function async(err, hash) {
//     // Store hash in your password DB.
//     const users = await User.insertMany([
//       {
//         username: "admin",
//         password: bcrypt.hashSync("123", saltRounds),
//       },
//     ]);
//     res.json(users);
//   });
// // });


// app.post("/api/login", async (req, res) => {
//   // console.log(req.body);
//   const { username, password } = req.body;

//   const user = await User.findOne({ username });
//   // const hash = user.password;

//   if (user === null) {
//     res.status(401).json({ msg: "No user"})
//     return;
//   }

//   // const loginPass = username === "admin";
//     const loginPass = bcrypt.compareSync(password, user.password);
//     if (loginPass) {
//       res.status(200).json({ msg: "Login route" });
//     } else {
//       res.status(401).json({ msg: "Not ok" });
//     }
//   });


// mongoose.connection.once("open", () => {
//   console.log("Connected to Mongodb");
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// });

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const cors = require("cors");
// const User = require("./models/User");

// const MONGO_URI = process.env.MONGO_URI;
// mongoose.connect(MONGO_URI);
// const app = express();
// const port = process.env.PORT ?? 3000;
// const saltRounds = 10;

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/api/users/seed", async (req, res) => {
//   await User.deleteMany({});

//   const users = await User.insertMany([
//     {
//       username: "admin",
//       password: bcrypt.hashSync("123", saltRounds),
//     },
//   ]);
//   res.json(users);
// });

// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (user === null) {
//       res.status(401).json({ msg: "No user" });
//       return;
//     }

//     const loginPass = bcrypt.compareSync(password, user.password);
//     if (loginPass) {
//       res.status(200).json({ msg: "Login ok" });
//     } else {
//       res.status(401).json({ msg: "Not ok" });
//     }
//   } catch (error) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// });


// mongoose.connection.once("open", () => {
//   console.log("Connected to Mongodb");
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// });


/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const cors = require("cors"); //HTTP-header based mechanism that allows a server to indicate any origins
const User = require("./models/User"); // User model

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);
const app = express();
const port = process.env.PORT ?? 3000;
const saltRounds = 10; 

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/users/seed", async (req, res) => {
  await User.deleteMany({});

  const users = await User.insertMany([
    {
      username: "admin",
      password: bcrypt.hashSync("123", saltRounds),
    },
    {
      username: "admin2",
      password: bcrypt.hashSync("456", saltRounds),
    },
  ]);
  res.json(users);
}); // end user seed

/* RB Country */
const Country = require("./models/Country"); // Country model

app.get("/api/countries/seed", async (req, res) => {
  await Country.deleteMany({});

  const countries = await Country.insertMany([
    {
      name: "Country1",
      flag: "flag1",
    },
    {
      name: "Country2",
      flag: "flag2",
    },
    {
      name: "Country3",
      flag: "flag3",
    },
    
  ]);
  res.json(countries);
});

const Holiday = require("./models/Holiday"); // Holiday model

app.get("/api/holidays/seed", async (req, res) => { // Server Administrator - NOT USER
    await Holiday.deleteMany({});
    console.log("Creating Holidays");
    const holidays = await Holiday.insertMany([
      {
        name: "OktoberFest",
        celebrated: true,
        description: "Top Holiday!" ,
        likes: 5,
        country: "634e85a0bd0966c2f40be2f2"
      },
      {
        name: "FlowerFest",
        celebrated: true,
        description: "Flower Fest!" ,
        likes: 0,
        country: "634e85a0bd0966c2f40be2f3" 
      },
      {
        name: "ScienceFest",
        celebrated: true,
        description: "Science Fest!" ,
        likes: 0,
        country: "634e85a0bd0966c2f40be2f4" 
      },
      {
        name: "TechFest",
        celebrated: false,
        description: "Science Fest!" ,
        likes: 5,
        country: "634e85a0bd0966c2f40be2f4" 
      },

    ]); // end insertMany

    res.json(holidays);
  
  });

app.post("/api/login", async (req, res) => {
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
      res.status(200).json({ msg: "Login ok" });
    } else {
      res.status(401).json({ msg: "Not ok" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});


app.post("/api/createholiday", async (req, res) => { // Start of post
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.description);
  let celeb = false;

  if (req.body.celebrated === 'on') celeb = true

  const countries = await Holiday.create(
    {

      name: req.body.name,
      celebrated: celeb,
      description: req.body.description,
      likes: req.body.likes,
      country: '634e85a0bd0966c2f40be2f2',

    })
});

app.get("/api/listholidays", async (req, res) => { // Start of post
  // Read All Holiday Data from DataBase(mongodb) - findAll
  // Return all data as a json response
  // Return all data as a html table


});

mongoose.connection.once("open", () => {
  console.log("Connected to Mongodb");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
