const mongodb = require("mongodb");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.glnuyrb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const doctorsCollection = client
  .db("ManagementHospital")
  .collection("doctorsCollection");

const treatmentsCollection = client
  .db("ManagementHospital")
  .collection("treatmentsCollection");

const departmentsCollection = client
  .db("ManagementHospital")
  .collection("departmentsCollection");
const appointmentsCollection = client
  .db("ManagementHospital")
  .collection("appointmentCollection");

const addStuffCollection = client
  .db("ManagementHospital")
  .collection("addStuffCollection");

const collection = {
  doctorsCollection,
  treatmentsCollection,
  departmentsCollection,
  appointmentsCollection,
  addStuffCollection
};
module.exports = collection;
