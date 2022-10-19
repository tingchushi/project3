/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

//Set up environment and session
const env = require('dotenv').config();
const session = require("express-session"); // Create a session object using express-session package


// Set up express
const express = require("express");
const app = express();

// Get the environment PORT and MONGODB_URI parameters
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODB_URI

/*
user workflow
/any -> retrieve -- should match
/any -> update -> retrieve -- if new string is specified in update -> not matched
                           -- if same string is specified in update -> matched
*/

app.use(
    session({
      secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
      resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
    })
  );



  app.get("/any", (req, res) => {
    //any route will work
    req.session.anyProperty = "RB2";
    console.log("any request came in");
    res.status(200).send(("Req successful", req.session.anyProperty).toString());
});

  app.get("/retrieve", (req, res) => {
    //any route will work
    if (req.session.anyProperty === "RB2") {
      //test to see if that value exists
      //do something if it's a match
      console.log("it matches! cool");
      //res.send("session anyproperty matched");
      console.log(req.session);
      //res.status(200).send(("Retrieve successful", req.session.anyProperty).toString());


    } else {
      //do something else if it's not
      console.log("nope, not a match");
      res.redirect("/");

    }
  });
  
  app.get("/update", (req, res) => {
    //any route will work
    req.session.anyProperty = "RB2";
    console.log("Anyproperty value is "+ req.session.anyProperty);
  
    res.status(200).send(("Update successful" + req.session.anyProperty).toString());
    // res.redirect("/");
});


app.get("/destroy-route", (req,res) => {
    //any route will work
    req.session.destroy((err) => {
      if (err) {
        //do something if destroying the session fails
        console.log("Unable to destroy session");
      } else {  
        //do something if destroying the session succeeds
        console.log("Session successfully destroyed");
        //res.status(200).send(("session destroyed").toString());
        console.log(req.session);
    }
    });
    res.redirect("/");
  });
  app.listen(PORT, () => {
    console.log("I am listening for requests at port!!!", PORT);
  });


  const bcrypt = require("bcrypt");

  // Use bcrypt to hash plaintext string
  
  const hashedString = bcrypt.hashSync("Dinosaur", bcrypt.genSaltSync(10));
  console.log("hashedString(ciphertext) " + hashedString);
  
  const hashedString2 = bcrypt.hashSync("Dinosaur", bcrypt.genSaltSync(10));
  console.log("hashedString2(ciphertext)" + hashedString2);
  
  comparison = bcrypt.compareSync("Lion", hashedString); //returns true or false
  console.log("plaintext hashtexts comparison ", comparison);
  
  comparison = bcrypt.compareSync("Dinosaur", hashedString); //returns true or false
  console.log("Comparison with original text", comparison);
  
  // Cannot compare this way
  if ("Dinosaur" === hashedString) {
      console.log("Equals");
  }
  else { 
      console.log("Not Equals");
  
  }
/* Use case 
    Hash a password and store in a database - no need to hash many times
    User enters password in a browser
    Take the password - do not hash it
    To check if the 


*/