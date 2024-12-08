const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Signal = require('./models/Signal');
const connectDB = require('./config/db');
app.use(cors());
app.use(express.json());

connectDB()

app.get('/api/signals', async (req, res) => {
  try {
    const signals = await Signal.find(); // Fetch all signals from the database
    res.json(signals);  // Send the data as a response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching signals' });
  }
});

const PORT = 1414;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
