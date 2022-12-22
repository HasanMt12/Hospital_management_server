const express = require('express')
require("dotenv").config();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;
const app = express();

//middleware

app.use(cors());
app.use(express.json());


const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.glnuyrb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});



async function run() {
  try {
    const doctorsCollection = client
      .db("ManagementHospital")
      .collection("doctorsCollection");

    const treatmentsCollection = client
      .db("ManagementHospital")
      .collection("treatmentsCollection");

    const departmentsCollection = client
      .db("ManagementHospital")
      .collection("departmentsCollection");

    //get all doctor
    app.get("/doctors", async (req, res) => {
      const query = {};
      const allDoctors = await doctorsCollection.find(query).toArray();
      res.send(allDoctors);
    });

    //get all departments
    app.get("/departments", async (req, res) => {
      const query = {};
      const allDepartments = await departmentsCollection.find(query).toArray();
      res.send(allDepartments);
    });

    //get all doctors
    app.get("/treatments", async (req, res) => {
      const query = {};
      const allTreatments = await treatmentsCollection.find(query).toArray();
      res.send(allTreatments);
    });

    //get treatmens by departments
    app.get("/departments/:treatment", async (req, res) => {
      const treatment = req.params.treatment;
      const query = { department: treatment };
      const allTreatments = await treatmentsCollection.find(query).toArray();
      res.send(allTreatments);
    });

    //get treatments by doctor id

    app.get("/doctors/:treatment", async (req, res) => {
      const treatment = parseInt(req.params.treatment);
      const query = { doctorCode: treatment };
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

    //get doctor details by id

    app.get("/doctor/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const doctor = await doctorsCollection.findOne(query);
      res.send(doctor);
    });



    //post doctors this is for dashboard
    app.post("/doctors", async (req, res) => {
      const doctor = req.body;
      const result = await doctorsCollection.insertOne(doctor);
      res.send(result);
    });
  }
  finally {

  }
}

run().catch((error) => console.log(error));


app.get('/', (req, res) => {
  res.send('Hello From webCracker!')
})

app.listen(port, () => {
  console.log(`WebCracker App listening on port ${port}`)
})