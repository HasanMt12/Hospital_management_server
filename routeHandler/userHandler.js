const express = require("express");
const router = express.Router();

// demo code

router.get("/", async (req, res) => {
  try {
    res.send("route is okay");

   
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
