const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();

const stripe = new Stripe(
  "sk_test_51HZoPmBj5Z3zKiF6MvKWaCzPaeSsttkaLnMMXoCrzhE3hPnrTjYkFHZiViRQKefHSza1Y5dCIf6v0WU1dTTLtTvl00lugumwuw"
);

app.use(express.json());
app.use(cors());

app.post("/api/checkout", async (req, res) => {
  try {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gaming Keyboard",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    res.send({ message: "Succesfull payment" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.raw.message });
  }
});

app.listen(3001, () => {
  console.log("Server on port", 3001);
});
