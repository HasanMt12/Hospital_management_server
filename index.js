const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const doctorsHandler = require("./routeHandler/dorctorsHandler");
const depertmentHandler = require("./routeHandler/depertmentHandler");
const treatmentHandler = require("./routeHandler/treatmentsHandler");
const userHandler = require("./routeHandler/userHandler");
const appointmentsHandler = require("./routeHandler/appointmentHanlder");
const { treatmentsCollection } = require("./collections/collections");

const addStuffHandler = require("./routeHandler/addStuffHandler");

const port = process.env.PORT || 5000;
const app = express();

//middleware

app.use(cors());
app.use(express.json());

async function run() {
  try {
    // doctors route handler
    app.use("/doctor", doctorsHandler);

    //departments route handler
    app.use("/departments", depertmentHandler);

    // extra routes agacha

    //treatments route handler
    app.use("/treatment", treatmentHandler);
    //user route handler
    app.use("/user", userHandler);

    //appointments route handler
    app.use("/appointment", appointmentsHandler);

    // ADD Stuff Handler
    app.use("/addStuff", addStuffHandler);

    //get treatmens by departments
    app.get("/departments/:treatment", async (req, res) => {
      const treatment = req.params.treatment;
      const query = {
        department: treatment,
      };
      const allTreatments = await treatmentsCollection.find(query).toArray();
      res.send(allTreatments);
    });

    //get treatments by doctor id

    app.get("/doctors/:treatment", async (req, res) => {
      const treatment = parseInt(req.params.treatment);
      const query = {
        doctorCode: treatment,
      };
      const allTreatments = await treatmentsCollection.find(query).toArray();
      res.send(allTreatments);
    });

    //get treatment details by id

    app.get("/treatments/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const treatment = await treatmentsCollection.findOne(query);
      res.send(treatment);
    });

    /* //get doctor details by id

    app.get("/doctor/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const doctor = await doctorsCollection.findOne(query);
      res.send(doctor);
    });

    
    
    //get featured doctor
  //  app.get("/featureddoctors", async (req, res) => {
  //    const query = { isFeatured:true };
  //    const allDoctors = await doctorsCollection.find(query).toArray();
  //    res.send(allDoctors);
  //  });


   



    //post doctors this is for dashboard
    app.post("/doctors", async (req, res) => {
      const doctor = req.body;
      const result = await doctorsCollection.insertOne(doctor);
      res.send(result);
    }); */
  } finally {
  }
}
// added comment
run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello From webCracker!");
});

app.listen(port, () => {
  console.log(`WebCracker App listening on port ${port}`);
});

// amake user email diye collection get korte hobe
//then user email a jomakrito collection and sloct collection er moddhe aggrigate korte hobe
// jodi konota mile jay tahole seta bad diye onnogula dekhate hobe
