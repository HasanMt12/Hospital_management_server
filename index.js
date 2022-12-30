const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const noticeHandler = require("./routeHandler/noticeHandler");
const doctorsHandler = require("./routeHandler/dorctorsHandler");
const depertmentHandler = require("./routeHandler/depertmentHandler");
const treatmentHandler = require("./routeHandler/treatmentsHandler");
const userHandler = require("./routeHandler/userHandler");
const appointmentsHandler = require("./routeHandler/appointmentHanlder");
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

    //notice route handler
    app.use("/notice", noticeHandler);

    // extra routes agacha

    //treatments route handler
    app.use("/treatment", treatmentHandler);
    //user route handler
    app.use("/user", userHandler);

    //appointments route handler
    app.use("/appointment", appointmentsHandler);

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
// added comment
run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello From webCracker!");
});

app.listen(port, () => {
  console.log(`WebCracker App listening on port ${port}`);
});
