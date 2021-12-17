const express = require('express');
const router = express.Router();
const User = require('../db models/schema.user');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
require('dotenv').config();
const verify = require('../verifyToken');


// UPDATE
router.put("/:id", verify, async function(req, res){   // verify token first
     if(req.user.id === req.params.id || req.user.isAdmin){   // first, the user must login to change property
          // if user wants to change password, encrypt the new password befote setting
          if(req.body.password) 
               req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();

          try {
               const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    {
                         $set: req.body,  // set new property
                    },
                    { new: true }   // required to return new (updated) object in response
               );
               res.status(200).json(updatedUser);
          }
          catch(err){
               res.status(500).json(err);
          }
     }
     else res.status(403).json("You can update only your account!");
});


// DELETE
router.delete("/:id", verify, async function(req, res){   // verify token first
     if(req.user.id === req.params.id || req.user.isAdmin){   // if you are admin, keep /:id blank
          try {
               const deleteUser = await User.findByIdAndDelete(req.params.id);
               res.status(200).json(`User has been deleted.`);
          }
          catch(err){
               res.status(500).json(err);
          }
     }
     else res.status(403).json("You can delete only your account!");
});


// GET ONE USER
router.get("/find/:id", async function(req, res){  // bad to use /:id, since, any other get function of /request will be used to match id from DB
     try{
          const user = await User.findById(req.params.id);
          res.status(201).json(user);
     }
     catch{
          res.status(404).json("User not found");
     }
});


// GET ALL USERS (ADMIN)
router.get("/", verify, async function(req, res){  // required user token verification
     const query = req.query.newUsers;   // the query in HTTP request is ?new=true
     // console.log(query);
     if (req.user.isAdmin) {
          try {  // if no query, fetch all users
               const users = (query === 'true')   // if ?new=(not_null_value), it is true
                    ? await User.find().sort({ _id: -1 }).limit(3)
                    : await User.find();
               res.status(200).json(users);
          } catch (err) {
               res.status(500).json(err);
          }
     } else {
          res.status(403).json("You are not not an Admin!");
     }
});


// GET USER MONTH STATS
router.get("/stats", async (req, res) => {
     const today = new Date();
     // const lastYear = today.setFullYear(today.setFullYear() - 1);

     try {
          const data = await User.aggregate([
               {
                    $project: {
                         month: { $month: "$createdAt" },  // define month variable
                    },
               },
               {
                    $group: {
                         _id: "$month",  // group _id by month
                         total: { $sum: 1 },
                    },
               },
          ]);
          res.status(200).json(data)
     }
     catch(err){
          res.status(500).json(err);
     }
});


module.exports = router;