const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conferenceSchema = new Schema ({
    title:{
        type: String,
        required : true,
    },
    description : String,
    image : {
        filename: {
            type:  String,
            default : "conferenceimage"
        },
        url: {
            type: String,
            default : "https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=2048x2048&w=is&k=20&c=GAilX3-Ir93C0mTl0O77lWFjgYGGaY-hNPO1efZazz8=",
            set: (v) => v === "" ? undefined : v
        },
    },
    location: {
        type: String
    },

    conferenceDate: {
        type: Date,
        required: true
    },

    registrationDeadline: {
        type: Date
    },

    status: {
        type: String,
        enum: ["upcoming", "ongoing", "completed"],
        default: "upcoming"
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Conference = mongoose.model("Conference",conferenceSchema);
module.exports = Conference;