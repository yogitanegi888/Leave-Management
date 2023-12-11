const mongoose = require("mongoose");
const { Schema } = mongoose;

const userschema = new Schema({
    username: {
        type: String,
        required: true
    },
    department: {
        type: String

    },
    sickleave: {
        type: Number
    },
    casualleave: {
        type: Number

    }


});

const usermodel = mongoose.model("users", userschema);
module.exports = usermodel;
