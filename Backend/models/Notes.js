import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    desc: {
        type: String,
    },


});

const note = mongoose.model("Note", noteSchema);
export default note;