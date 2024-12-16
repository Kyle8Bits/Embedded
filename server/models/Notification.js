const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    device: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    time: { type: String, required: true } // Store time as a string (e.g., "14:30:00")
}, { collection: 'notifications' });

// Pre-save hook to set the time field automatically
NotificationSchema.pre('save', function(next) {
    const now = new Date();
    
    // Format date as "YYYY-MM-DD"
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    this.date = `${year}-${month}-${day}`;
    
    // Format time as "HH:MM:SS"
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    this.time = `${hours}:${minutes}:${seconds}`;
    
    next();
});

module.exports = mongoose.model('Notification', NotificationSchema);