const express = require("express");
const { ObjectId } = require("mongodb");
const { treatmentsCollection } = require("../collections/collections");
const router = express.Router();

// demo code

router.get("/", async (req, res) => {
  try {
    const query = {};
    const allTreatments = await treatmentsCollection.find(query).toArray();
    res.send(allTreatments);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get("/departments/:treatment", async (req, res) => {
  const treatment = req.params.treatment;
  const query = {
    department: treatment,
  };
  const allTreatments = await treatmentsCollection.find(query).toArray();
  res.send(allTreatments);
});

router.get("/doctors/:treatment", async (req, res) => {
  const treatment = parseInt(req.params.treatment);
  const query = {
    doctorCode: treatment,
  };
  const allTreatments = await treatmentsCollection.find(query).toArray();
  res.send(allTreatments);
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
