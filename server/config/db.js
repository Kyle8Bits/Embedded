const mongoose = require('mongoose');

const connectDB = async () => {
    const db_url = 'mongodb+srv://khoamaidang2611:khoa_phuc@cluster0.pqsc3.mongodb.net/iot_data?retryWrites=true&w=majority';

    try {
        await mongoose.connect(db_url);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
};



module.exports = connectDB;

