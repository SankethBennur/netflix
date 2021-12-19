const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const movieRoute = require('./routes/movie.js');
const listRoute = require('./routes/list.js');


app.use(express.json());
app.use(cors());
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/movie", movieRoute);
app.use("/list", listRoute);


mongoose.connect(process.env.MONGODB_URL)
     .then(function(){
          console.log('Connection to MongoDB Successful!');
     })
     .catch(function(){
          console.log('Connection Unsuccessful.')
     }
);


// backend home
app.get("/", function(req, res){
     res.status(200).json("Hell World");
});


// Listen
app.listen(port, function(){
     console.log(`Listening in port: ${port}`);
});