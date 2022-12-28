const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const {
  doctorsCollection,
  treatmentsCollection,
} = require("../collections/collections");
const router = express.Router();

// get all doctors
router.get("/", async (req, res) => {
  try {
    const data = await doctorsCollection.find({}).toArray();
    res.status(200).send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
});

// get featured doctors
router.get("/featured", async (req, res) => {
  try {
    const filter = {
      isFeatured: true,
    };
    const data = await doctorsCollection.find(filter).toArray();
    res.status(200).send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
});

// get specified doctor by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = {
      _id: ObjectId(id),
    };
    const doctor = await doctorsCollection.findOne(query);
    res.status(200).send(doctor);
  } catch (error) {
    res.send({ error: error.message });
  }
});

// post doctor
router.post("/", async (req, res) => {
  try {
    const doctor = req.body;
    const result = await doctorsCollection.insertOne(doctor);
    res.status(200).send(result);
  } catch (error) {
    res.send({ error: error.message });
  }
});

//delete doctor
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = {
      _id: ObjectId(id),
    };
    const result = doctorsCollection.deleteOne(filter);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = router;
