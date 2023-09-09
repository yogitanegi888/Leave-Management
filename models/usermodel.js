const mongoose = require("mongoose");
const { Schema } = mongoose;

const userfeedSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: () => new Date()
    },
    userid: {
        type: String,
        required: true
    },

    intrested: {
        type: [String],
       


    },
    image: {
        type: String

    }


});

const userModel = mongoose.model("userFeeds", userfeedSchema);
module.exports = userModel;
