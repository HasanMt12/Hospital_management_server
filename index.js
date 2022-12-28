const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const doctorsHandler = require("./routeHandler/dorctorsHandler");
const depertmentHandler = require("./routeHandler/depertmentHandler");
const treatmentHandler = require("./routeHandler/treatmentsHandler");
const { treatmentsCollection } = require("./collections/collections");
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

    //treatments route handler
    app.use("/treatment", treatmentHandler);

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
  } finally {
  }
}

run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello From webCracker!");
});

app.listen(port, () => {
  console.log(`WebCracker App listening on port ${port}`);
});
