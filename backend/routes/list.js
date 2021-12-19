const router = require("express").Router();
const List = require("../db models/schema.list.js");
const verify = require("../verifyToken");

// Technically, I wouldn't need a List DB Schema or model. I could just aggregate based on category.
// It would require creating a recommender system.


//CREATE
router.post("/", verify, async function(req, res){
     if (req.user.isAdmin) {
          const newList = new List(req.body);
          try {
               const savedList = await newList.save();
               res.status(201).json(savedList);
          } catch (err) {
               res.status(500).json(err);
          }
     } else {
          res.status(403).json("Access Denied!");
     }
});


//DELETE
// router.delete("/:id", verify, async function(req, res){
router.delete("/:id", async function(req, res){
     if (req.user.isAdmin) {
          try {
               await List.findByIdAndDelete(req.params.id);
               res.status(201).json("The list has been delete...");
          } catch (err) {
               res.status(500).json(err);
          }
     } else {
          res.status(403).json("Access Denied!");
     }
});


//GET
// router.get("/", verify, async function(req, res){   // Here is the aggregation!
router.get("/", async function(req, res){   // Here is the aggregation!
     const typeQuery = req.query.type;   // Type is series or movies
     const genreQuery = req.query.genre;   // Type and Genre from List schema properties.
     let list = [];

     try {
          if (typeQuery) {
               if (genreQuery) {
                    list = await List.aggregate([
                         { $sample: { size: 10 } },
                         { $match: { type: typeQuery, genre: genreQuery } },
                    ]);
               }
               else {
                    list = await List.aggregate([   // if no genre is provided. 
                         { $sample: { size: 10 } },
                         { $match: { type: typeQuery } },
                    ]);
               }
          }
          else {
               list = await List.aggregate([{ $sample: { size: 10 } }]);
          }
          res.status(200).json(list);
     } catch (err) {
          res.status(500).json(err);
     }
});


module.exports = router;