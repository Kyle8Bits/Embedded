const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    device: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true } // Store time as a string (e.g., "14:30:00")
}, { collection: 'notifications'});


const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;