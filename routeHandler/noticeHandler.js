const express = require("express");
const router = express.Router();

const {
    noticeCollection
} = require("../collections/collections");

router.get("/", async (req, res) => {
  try {
     
  // console.log(user);

  res.send("notice route connected");
  } catch (error) {
    res.send({
      error: error.message
    });
  }
});

// post doctor
router.post("/", async (req, res) => {
    try {
        const doctor = req.body;
        const result = await noticeCollection.insertOne(doctor);
        res.status(200).send(result);
    } catch (error) {
        res.send({
            error: error.message
        });
    }
});





module.exports = router;