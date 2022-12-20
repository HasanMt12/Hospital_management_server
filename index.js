const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

//middleware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gniuvqv.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    const doctorsDb = client.db('hospitalManagement').collection('doctors')

    app.get('/doctors' , async(req,res) => {
        const query = {};
        const allDoctors = await doctorsDb.find(query).toArray();
        res.send(allDoctors);
    })
       
    
    

  }
  finally {

  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello From webCracker!')
})

app.listen(port, () => {
  console.log(`WebCracker App listening on port ${port}`)
})