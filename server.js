const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HzeuECBsWlpmphN7a1VBw1UmVZNIR67udobHiTs7zmYgQ5BHWaHjpgCc4mZTLz8eNwKDckrsV61mGT9jI06MdqP006dNcDTDS"
);

// const stripe = new Stripe(
//   "sk_test_51HzeuECBsWlpmphN7a1VBw1UmVZNIR67udobHiTs7zmYgQ5BHWaHjpgCc4mZTLz8eNwKDckrsV61mGT9jI06MdqP006dNcDTDS"
// );
app.use(cors());
app.use(express.json());

app.post("/api/pay", async (req, res) => {
  const { id, amount } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method: id,
      confirm: true,
    });
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      error: err,
    });
  }
});

app.listen(8000, () => console.log("Server running"));
