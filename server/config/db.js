const mongoose = require('mongoose');

const connectDB = async () => {
    const db_url = '<your mongodb url>';

    try {
        await mongoose.connect(db_url);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;

