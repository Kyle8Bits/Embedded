const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');  // Assuming this file is in the same directory
const Signal = require('./models/Signal');  // Assuming this is the file where you defined your Signal model
const cors = require('cors');
const app = express();

// Middleware to handle JSON requests
app.use(cors());

app.use(express.json());
// Connect to MongoDB
connectDB();

const apiToken = process.env.API_TOKEN;

// API route to get data from MongoDB
app.get('/signals', async (req, res) => {
    try {
        const signals = await Signal.find();  
        res.status(200).json(signals);  
    } catch (err) {
        console.error('Error fetching signals:', err);
        res.status(500).send('Error fetching signals');
    }
});

// Basic route to test server
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});