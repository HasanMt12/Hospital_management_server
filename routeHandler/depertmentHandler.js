const express = require("express");
const { departmentsCollection } = require("../collections/collections");
const router = express.Router();

// demo code

router.get("/", async (req, res) => {
  try {
    const query = {};
    const allDepartments = await departmentsCollection.find(query).toArray();
    res.send(allDepartments);
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
