const express = require("express");
const { departmentsCollection } = require("../collections/collections");
const router = express.Router();

// demo code

router.get("/", async (req, res) => {
  try {
    const size = parseInt(req.query.size);
    const page = parseInt(req.query.page);
    const query = {};
    const count = await departmentsCollection.estimatedDocumentCount();
    const allDepartments = await departmentsCollection
      .find(query)
      .skip(size * page)
      .limit(size)
      .toArray();
    res.send({ count, allDepartments });
    console.log(size, page);
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
