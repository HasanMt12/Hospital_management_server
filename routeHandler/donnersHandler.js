const express = require("express");
const { ObjectId } = require("mongodb");
const {
  appointmentsCollection,
  donnerCollection,
} = require("../collections/collections");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await donnerCollection.find({}).toArray();
    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
});
router.get("/all", async (req, res) => {
  try {
    const data = await donnerCollection.find({}).toArray();
    res.send(data);
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
    const data = await donnerCollection.findOne(query);
    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = {
      _id: ObjectId(id),
    };
    const doc = req.body;
    const updatedDoc = {
      $set: doc,
    };
    const data = await donnerCollection.updateOne(filter, updatedDoc);
    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const doc = req.body;
    const data = await donnerCollection.insertOne(doc);
    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = {
      _id: ObjectId(id),
    };
    const data = await donnerCollection.deleteOne(filter);
    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
