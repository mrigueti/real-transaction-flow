const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const sendToQueue = require("../queues/producer");
const path = require("path");

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "brl",
          product_data: { name: item.name },
          unit_amount: item.amount * 100,
        },
        quantity: item.quantity,
      })),
  
      success_url: `${req.protocol}://${req.get("host")}/payments/success`,
      cancel_url: `${req.protocol}://${req.get("host")}/payments/cancel`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const paymentData = {
        id: session.id,
        amount: session.amount_total / 100,
        status: "confirmed",
      };

      sendToQueue("paymentQueue", paymentData);
    }

    res.json({ received: true });
  }
);

router.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/success.html"));
});

router.get("/cancel", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/cancel.html"));
});


module.exports = router;
