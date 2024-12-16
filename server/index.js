const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); 
const Device = require('./models/Device'); 
const Notification = require('./models/Notification'); 
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.get('/devices', async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (err) {
        console.error('Error fetching devices', err);
        res.status(500).send('Server Error');
    }
});

app.put('/devices/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id + status);

    try {
        const device = await Device.findOneAndUpdate({ id }, { status }, { new: true });

        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }

        const message = `${device.name} has been turned ${status}`;

        const date = new Date();

        const day = (`0${date.getDate()}`).slice(-2);
        const year = date.getFullYear();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getMonth()];
        const formattedDate = `${day} ${month} ${year}`;


        const hours = (`0${date.getHours()}`).slice(-2);
        const minutes = (`0${date.getMinutes()}`).slice(-2);
        const seconds = (`0${date.getSeconds()}`).slice(-2);
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        console.log(formattedTime);

        const newNotification = new Notification({
            message,
            device: device.name,
            date: formattedDate,
            time: formattedTime
        });

        await newNotification.save();

        res.json(device);
    } catch (err) {
        console.error('Error updating device status', err);
        res.status(500).send('Server Error');
    }
});

app.get('/devices/:id/status', async (req, res) => {
    const { id } = req.params;
    try {
        const device = await Device.findOne({ id });
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }
        res.json({ status: device.status });
    } catch (err) {
        console.error('Error fetching device status', err);
        res.status(500).send('Server Error');
    }
});

app.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (err) {
        console.error('Error fetching notifications', err);
        res.status(500).send('Server Error');
    }
});


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});