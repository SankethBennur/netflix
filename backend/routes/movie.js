const router = require('express').Router();
const Movie = require('../db models/schema.movie.js');
const verify = require('../verifyToken');  // to verify admin active token only


// CREATE
router.post("/", verify, async (req, res) => {
     if (req.user.isAdmin) {  // only admin can post movies
          const newMovie = new Movie(req.body);
          try {
               const savedMovie = await newMovie.save();
               res.status(201).json(savedMovie);
          }
          catch(err){
               res.status(500).json(err);
          }
     } else {
          res.status(403).json("Access Denied");
     }
});


// UPDATE
router.put("/:id", verify, async (req, res) => {
     if (req.user.isAdmin) {
          try {
               const updatedMovie = await Movie.findByIdAndUpdate(
                    req.params.id,
                    {
                         $set: req.body,
                    },
                    { new: true }  // required to return new (updated) object in response
               );
               res.status(200).json(updatedMovie);
          }
          catch(err){
               res.status(500).json(err);
          }
     }
     else{
          res.status(403).json("Access Denied");
     }
});


// DELETE
router.delete("/:id", verify, async (req, res) => {
     if (req.user.isAdmin) {
          try {
               await Movie.findByIdAndDelete(req.params.id);
               res.status(200).json("The movie has been deleted");
          }
          catch(err){
               res.status(500).json(err);
          }
     }
     else{
          res.status(403).json("Access Denied");
     }
});


// GET
// router.get("/find/:id", verify, async (req, res) => {  // we may have to verify a user to even get a title
router.get("/find/:id", async (req, res) => {  // we may have to verify a user to even get a title
     try {
          const movie = await Movie.findById(req.params.id);
          res.status(200).json(movie);
     } catch (err) {
          res.status(500).json(err);
     }
});

// ADMIN
router.get("/all", async (req, res) => {  // we may have to verify a user to even get a title
     let type = (req.query.type === 'series')? true: false;
     let movie;
     try {
          // const movie = await Movie.find();
          movie = await Movie.aggregate([  // aggregate and find movies of sample size 1 (one movie title only)
               { $match: {
                    genre: req.query.genre,
                    isSeries: type
               } },
               { $sample: { size: 10 } },
          ]);
          let num = 5
          res.status(200).json(movie);
          // console.log(req.query.genre);
          

     } catch (err) {
          res.status(500).json(err);
     }
});


// GET RANDOM
// FEATURED
// router.get("/random", verify, async (req, res) => {
router.get("/random", async (req, res) => {
     const type = req.query.type;
     let movie;
     try {
          if(type === "series"){
               movie = await Movie.aggregate([  // aggregate and find movies of sample size 1 (one movie title only)
                    { $match: { isSeries: true } },
                    { $sample: { size: 1 } },
               ]);
          }
          else{
               movie = await Movie.aggregate([
                    { $match: { isSeries: false } },
                    { $sample: { size: 1 } },
               ]);
          }
          res.status(200).json(movie);
          // console.log(movie)
     }
     catch(err){
          res.status(500).json(err);
     }
});


module.exports = router;