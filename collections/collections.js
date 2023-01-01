const mongodb = require("mongodb");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.glnuyrb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const collection = {};
collection.doctorsCollection = client
  .db("ManagementHospital")
  .collection("doctorsCollection");

collection.treatmentsCollection = client
  .db("ManagementHospital")
  .collection("treatmentsCollection");

collection.departmentsCollection = client
  .db("ManagementHospital")
  .collection("departmentsCollection");
collection.appointmentsCollection = client
  .db("ManagementHospital")
  .collection("appointmentCollection");

collection.addStuffCollection = client
  .db("ManagementHospital")
  .collection("addStuffCollection");

collection.usersCollection = client
  .db("ManagementHospital")
  .collection("usersCollection");

collection.noticeCollection = client

  .db("ManagementHospital")
  .collection("noticeCollection");

collection.donnerCollection = client
  .db("ManagementHospital")
  .collection("donnerCollection");

collection.paymentsCollection = client
  .db("ManagementHospital")
  .collection("paymentsCollection");

module.exports = collection;
