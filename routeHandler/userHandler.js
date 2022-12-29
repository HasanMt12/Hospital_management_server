const express = require("express");
const router = express.Router();
const {
  usersCollection
} = require("../collections/collections");
// demo code

router.get("/", async (req, res) => {
  try {
    res.send(" users route is okay");

   
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
     const user = req.body;
  console.log(user);
  const result = await usersCollection.insertOne(user);
  res.send(result);


  } catch (error) {
    res.send({
      error: error.message
    });
  }
});




module.exports = router;

