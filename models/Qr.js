const mongoose = require('mongoose');
const QrSchema = new mongoose.Schema({
    username: {
        type: String
    },
    key: {
        type: String
    }
});

module.exports = mongoose.model('Qr', QrSchema);