const express = require("express");
const router = express.Router();

const {
  usersCollection
} = require("../collections/collections");
// demo code



router.post("/", async (req, res) => {
  try {
     const user = req.body;
  // console.log(user);
  const result = await usersCollection.insertOne(user);
  res.send(result);
  } catch (error) {
    res.send({
      error: error.message
    });
  }
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





module.exports = router;


