const express = require("express");
const { ObjectId } = require("mongodb");
const { addStuffCollection } = require("../collections/collections");
const router = express.Router();

// demo code

router.get("/", async (req, res) => {
  try {
    res.send("add stuff route is okay");
  } catch (error) {
    res.send({ error: error.message });
  }
});

/* -----Add Stuff-------- */
try {
  router.post("/", async (req, res) => {
    const addStuff = req.body;
    const stuffs = await addStuffCollection.insertOne(addStuff);
    // const Stuff = await StuffsCollection.insertOne(newStuff);
    res.send({ stuffs });
  });
} catch (error) {
  res.status(404).send({ error: error.message });
}

try {
  router.get("/", async (req, res) => {
    const query = {};
    const addStuff = await addStuffCollection.find(query).toArray();
    res.send(addStuff);
  });
} catch (error) {
  res.status(404).send({ error: error.message });
}

/* -------Delete Product------- */
try {
  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const results = await addStuffCollection.deleteOne(filter);
    res.send({  results });
  });
} catch (error) {
  res.status(404).send({ error: error.message });
}

module.exports = router;
