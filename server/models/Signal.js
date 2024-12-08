const mongoose = require('mongoose');

const SignalSchema = new mongoose.Schema({
    status: {type: String, required: true, enum: ['ON', 'OFF', 'LOST SIGNAL']},
    name: {type:String, required: true},
    type: {type:String, required: true},
    location: {type: String, required: true}
},{collection: 'signals'})

const Signal = mongoose.model('Signal', SignalSchema);
module.exports = Signal;

