const mongoose = require("mongoose");
const { Schema } = mongoose;

const leavechema = new Schema({
    username: {
        type: String,
        required: true
    },
    department: {
        type: String

    },
    leavetype: {
        type: String
    },
    startdate: {
        type: Date

    },
    enddate: {
        type: Date

    }


});

const leavesmodel = mongoose.model("leaves", leavechema);
module.exports = leavesmodel;