const express = require("express");
const { ObjectId } = require("mongodb");
const { appointmentsCollection, treatmentsCollection } = require("../collections/collections");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await appointmentsCollection.find({}).toArray();
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
    const data = await appointmentsCollection.findOne(query);
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
    const data = await appointmentsCollection.updateOne(filter, updatedDoc);
    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
});



router.post("/", async (req, res) => {
  try {
    const doc = req.body;
    const date = doc.bookedDate;
    // console.log(doc)
    const name = doc.serviceName;
    const bookingQuery = { bookedDate:date };
    const alreadyBooked = await appointmentsCollection.find(bookingQuery).toArray()
    // console.log(alreadyBooked)
    const serviceQuery = req.query.name;
    const services = await treatmentsCollection
      .find({ department:serviceQuery })
      .toArray();
    services.forEach(service=>{
      const optionBooked = alreadyBooked.filter(book=>
        book.serviceName === service.name);
        const bookedSlots = optionBooked.map(book=>book.slot)
        const remaingSlots = service.timeSlot.filter((slot) => !bookedSlots.includes(slot));
        service.timeSlot  = remaingSlots

      console.log(date, service.name, remaingSlots.length);
    })

    const data = await appointmentsCollection.insertOne(doc)
    res.send(services);
    
   
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
    const data = await appointmentsCollection.deleteOne(filter);
    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
