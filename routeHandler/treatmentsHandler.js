const express = require("express");
const { ObjectId } = require("mongodb");
const { treatmentsCollection } = require("../collections/collections");
const router = express.Router();

// demo code

router.get("/", async (req, res) => {
  try {
    const query = {};
    const allTreatments = await treatmentsCollection.find(query).toArray();
    res.send({ data: allTreatments });
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = {
      _id: ObjectId(id),
    };
    const treatment = await treatmentsCollection.findOne(query);
    res.send(treatment);
  } catch (error) {
    res.send({ error: error.message });
  }
});
module.exports = router;
