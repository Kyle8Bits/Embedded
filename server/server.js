// /api/signals.js
const mongoose = require('mongoose');
const Signal = require('./models/Signal');
const connectDB = require('./config/db');

// Ensure database connection
connectDB()

module.exports = async (req, res) => {
  await connectDatabase();  // Ensure DB connection is established
  
  if (req.method === 'GET') {
    try {
      const signals = await Signal.find();  // Fetch signals from DB
      return res.status(200).json(signals);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching signals' });
    }
  }
  return res.status(405).json({ message: 'Method Not Allowed' });  // Handle other HTTP methods
};
