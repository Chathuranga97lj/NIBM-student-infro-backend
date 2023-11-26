const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});


exports.User = mongoose.model('User', userSchema);