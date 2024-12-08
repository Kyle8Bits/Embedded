const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Signal = require('./models/Signal');
const connectDB = require('./config/db');
app.use(cors());
app.use(express.json());

connectDB()

app.use('/', (req, res) => {
  res.send("Sever is running");
});

app.listen(1414, console.log("Server start port 1414"))