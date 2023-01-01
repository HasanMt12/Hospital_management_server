const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const http = require ('http')
const { Server } = require("socket.io");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const noticeHandler = require("./routeHandler/noticeHandler");
const doctorsHandler = require("./routeHandler/dorctorsHandler");
const depertmentHandler = require("./routeHandler/depertmentHandler");
const treatmentHandler = require("./routeHandler/treatmentsHandler");
const userHandler = require("./routeHandler/userHandler");
const donnerHandler = require("./routeHandler/donnersHandler");
const appointmentsHandler = require("./routeHandler/appointmentHanlder");
const { treatmentsCollection } = require("./collections/collections");

const addStuffHandler = require("./routeHandler/addStuffHandler");




const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});




//middleware

app.use(cors());
app.use(express.json());


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
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

    // ADD Stuff Handler
    app.use("/addStuff", addStuffHandler);
  

    //add doners route

    app.use("/donner", donnerHandler);
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



    
    // ------Payment-gateway------
    app.post("/create-payment-intent", async (req, res) => {
      const booking = req.body;
      const price = booking.price;
      const amount = price * 100;

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const result = await paymentsCollection.insertOne(payment);
      const id = payment.bookingId;
      const filter = { _id: ObjectId(id) };
      const updatedDoc = {
        $set: {
          paid: true,
          transactionId: payment.transactionId,
        },
      };
      const updatedResult = await bookingsCollection.updateOne(
        filter,
        updatedDoc
      );
      res.send(result);
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

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});



