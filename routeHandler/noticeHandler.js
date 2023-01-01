const express = require("express");
const router = express.Router();
const {  ObjectId } = require("mongodb");
const {
    noticeCollection
} = require("../collections/collections");

// router.get("/", async (req, res) => {
//   try {
     
  // console.log(user);

//   res.send("notice route connected");
//   } catch (error) {
//     res.send({
//       error: error.message
//     });
//   }
// });

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

 router.get('/', async (req, res) => {
      const query = {};
      const users = await noticeCollection.find(query).toArray();
      res.send(users);
    })


  try {
  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const results = await noticeCollection.deleteOne(filter);
    res.send({  results });
  });
} catch (error) {
  res.status(404).send({ error: error.message });
}

module.exports = router;