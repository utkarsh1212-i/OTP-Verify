const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        // required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);