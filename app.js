const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const router = require("./routes/product.route");
app.use(express.json());
app.use(cors());




app.use('/api/v1/product', router);



module.exports = app;