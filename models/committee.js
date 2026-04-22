const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const committeeSchema = new mongoose.Schema({
    name: String,
    agenda: String,

    conference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conference"
    },

    totalSeats: Number,

    countries: [
        {
            name: String,
            // assignedTo: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: "User",
            //     default: null
            // }
        }
    ],

    isActive: {
        type: Boolean,
        default: false   
    }
});

const Committee = mongoose.model("Committee",committeeSchema);
module.exports = Committee;