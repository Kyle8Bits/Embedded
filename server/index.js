const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); 
const http = require('http');
const Device = require('./models/Device'); 
const Notification = require('./models/Notification'); 
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

connectDB();

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Listen for changes in the database
const db = mongoose.connection;
db.once('open', () => {
    const changeStream = db.collection('devices').watch([], { fullDocument: 'updateLookup' });

    changeStream.on('change', async (change) => {
        try {

            let message = '';
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

            if(change.fullDocument.type === 'SENSOR') {
                if(change.fullDocument.status === 'ON') {
                    message = `${change.fullDocument.name} has detected something`;
                }
                else {
                    message = `${change.fullDocument.name} is idle`;
                }
            }
            else{
                message = `${change.fullDocument.name} is now ${change.fullDocument.status}`;
            }

            // Create new notification
            const newNotification = new Notification({
                message,
                device: change.fullDocument ? change.fullDocument.name : 'Unknown Device',
                date: formattedDate,
                time: formattedTime
            });

            // Save to database
            await newNotification.save();

            // Emit the change to connected clients
            io.emit('databaseChange', { message, date: formattedDate, time: formattedTime });
        } catch (error) {
            console.error('Error handling changeStream:', error);
        }
    });
});


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

    try {
        const device = await Device.findOneAndUpdate({ id }, { status }, { new: true });

        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }

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


app.get('/', (req, res) => {
    res.send('Socket.IO and MongoDB Change Streams Server');
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});