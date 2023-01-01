const express = require("express");
require("dotenv").config();
const {
  paymentsCollection,
  appointmentsCollection,
} = require("../collections/collections");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// create payment intent
router.post("/create-payment-intent", async (req, res) => {
  const booking = req.body;

  const fee = booking.fee;
  const amount = fee * 100;

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

// post payment info on db
router.post("/payments", async (req, res) => {
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

  const updatedResult = await appointmentsCollection.updateOne(
    filter,
    updatedDoc
  );
  res.send(result);
});

module.exports = router;
