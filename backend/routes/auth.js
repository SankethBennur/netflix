const express = require('express');
const router = express.Router();
const User = require('../db models/schema.user');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
require('dotenv').config();

//REGISTER
router.post("/register", async function(req, res){  // asynchronously execute in server.
     // can also use exec after findOne function to execute asynchronously in server.

     const user = await User.findOne({ email: req.body.email });
     if(user) return res.status(400).json({ message: "User already exists." });
     // if(user) return window.alert("User already exists.")

     const newUser = new User({
          email: req.body.email,
          username: req.body.username,
          password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
     });

     newUser.save()
          .then(() => {res.json(newUser)})
          .catch(err => {res.status(400).json('Error: ' + err)});

});

// LOGIN
router.post("/login", async function(req, res){
     const user = await User.findOne({ email: req.body.email });
     if(!user) res.status(401).json("User does not exist. Please Register!");

     else{
     // Password Authentication
          const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
          const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

          if(originalPassword !== req.body.password)
               res.status(401).json("Wrong password");
          else{
               const accessToken = jwt.sign(
               { id: user._id, isAdmin: user.isAdmin },
               // wrap information in token with secret key
               process.env.SECRET_KEY,
               { expiresIn: "5d" }
               );
     
               const { password, ...info } = user._doc;
               res.status(200).json({ ...info, accessToken });
          }
     };
});


module.exports = router;