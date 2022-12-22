const express = require('express')
require("dotenv").config();
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 5000;
const app = express();

//middleware

app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER, process.env.DB_PASSWORD);


const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.glnuyrb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});



async function run() {
  try {
    const doctorsDb = client
      .db("ManagementHospital")
      .collection("doctorsCollection");

    app.get('/doctors' , async(req,res) => {
        const query = {};
        const allDoctors = await doctorsDb.find(query).toArray();
        res.send(allDoctors);
    })

    app.post("/doctors", async (req,res) => {
      const doctor = req.body;
      console.log(doctor);
      const result = await doctorsDb.insertOne(doctor)
      res.send(result)
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