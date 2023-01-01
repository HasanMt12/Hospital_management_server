const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const { usersCollection } = require("../collections/collections");
// demo code

router.post("/", async (req, res) => {
  try {
    const user = req.body;
    // console.log(user);
    const result = await usersCollection.insertOne(user);
    res.send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});


//get all users by database and send data to client side
router.get("/", async (req, res) => {
  const query = {};
  const users = await usersCollection.find(query).toArray();
  res.send(users);
});

    //get all users by database and send data to client side
    router.get('/', async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    })

    router.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      res.send({ isAdmin: user?.role === "admin" });
    });

     router.get('/doctors/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isDoctor: user?.role === 'doctor'});
        });

    router.get('/nurse/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isNurse: user?.role === 'nurse'});
        });

      try {
  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const results = await usersCollection.deleteOne(filter);
    res.send({  results });
  });
} catch (error) {
  res.status(404).send({ error: error.message });
}



router.get("/admin/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const user = await usersCollection.findOne(query);
  res.send({ isAdmin: user?.role === "admin" });
});

router.get("/doctors/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const user = await usersCollection.findOne(query);
  res.send({ isDoctor: user?.role === "doctor" });
});

router.get("/nurse/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const user = await usersCollection.findOne(query);
  res.send({ isNurse: user?.role === "nurse" });
});

module.exports = router;
