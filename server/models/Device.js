const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    status: {type: String, required: true, enum: ['ON', 'OFF', 'LOST SIGNAL']},
    type:{type:String, required:true, enum: ['LED', 'SENSOR', 'FAN']},
    name: {type:String, required: true},
    isActive: {type:Boolean, required: true, default: false},
    location: {type: String, required: true}
},{collection: 'devices'})

const Device = mongoose.model('Device', DeviceSchema);
module.exports = Device;
