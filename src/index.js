const path = require("path");
require("dotenv").config();

const express = require("express");
const paymentRoutes = require("./controllers/paymentController");
const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use("/payments", paymentRoutes);
app.listen(3000, () => console.log("Server rodando na porta 3000"));
