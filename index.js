const express = require("express");
require("dotenv").config();
const cors = require("cors");
const noticeHandler = require("./routeHandler/noticeHandler");
const doctorsHandler = require("./routeHandler/dorctorsHandler");
const depertmentHandler = require("./routeHandler/depertmentHandler");
const treatmentHandler = require("./routeHandler/treatmentsHandler");
const userHandler = require("./routeHandler/userHandler");
const donnerHandler = require("./routeHandler/donnersHandler");
const appointmentsHandler = require("./routeHandler/appointmentHanlder");
const paymentHandler = require("./routeHandler/paymentHandler");
const addStuffHandler = require("./routeHandler/addStuffHandler");
const { server } = require("./socketHandler/ChatHandler");
const port = process.env.PORT || 5000;
const serverPort = 3001;

const app = express();

//middleware
app.use(cors());
app.use(express.json());

async function run() {
  try {
    // ------Doctor route handler------
    // get and post route :/doctor && update and delete : /doctor/:id
    app.use("/doctor", doctorsHandler);

    // ------departments Handler------
    // get and post route :/departments && update and delete : /departments/:id
    app.use("/departments", depertmentHandler);

    // notice route handler
    // get and post route :/notice && update and delete : notice/:id
    app.use("/notice", noticeHandler);

    // ------treatment route handler------
    // get and post route :/treatment && update and delete : treatment/:id
    app.use("/treatment", treatmentHandler);

    // user route handler
    // get and post route :/user && update and delete : /user/:id
    app.use("/user", userHandler);

    // ------appoint route handler------
    // get and post route :/appointment && update and delete : appointment/:id
    app.use("/appointment", appointmentsHandler);

    // ------add stuff route handler------
    // get and post route : /addStuff && update and delete route : /addStuff/:id
    app.use("/addStuff", addStuffHandler);

    //------donner route------
    // get and post route : /donner && update and delete route : /donner:id
    app.use("/donner", donnerHandler);

    // ------Payment-gateway------
    // create payment-intent : /payment/create-payment-intent
    // post payment info : /payment/payments
    app.use("/payment", paymentHandler);
  } finally {
  }
}
// added comment
run().catch((error) => console.log(error));

// default route
app.get("/", (req, res) => {
  res.send("Hello From webCracker!");
});

// Listen our api
app.listen(port, () => {
  console.log(`WebCracker App listening on port ${port}`);
});

// Listen our chating server
server.listen(serverPort, () => {
  console.log("SERVER RUNNING");
});
