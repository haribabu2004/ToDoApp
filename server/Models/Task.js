const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task:{
        type:String,
    },
    completed:{
        type:Boolean,
        default:false
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,  // Matches the _id in the users collection
        ref: "Authentication",              
        required: true
    }
})

module.exports = mongoose.model('Task',TaskSchema);