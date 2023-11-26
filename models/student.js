const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const studentSchema = mongoose.Schema({
    regNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    parentNo: {
        type: String,
        required: true
    }

});


exports.Student = mongoose.model('Student', studentSchema);