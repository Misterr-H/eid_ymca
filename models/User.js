const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    accessToken: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);