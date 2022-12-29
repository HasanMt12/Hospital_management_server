const express = require("express");
const router = express.Router();

// demo code

router.get("/", async (req, res) => {
  try {
    res.send("route is okay");

    app.post("/", async (req, res) => {
      const user = req.body;
      // console.log(user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
