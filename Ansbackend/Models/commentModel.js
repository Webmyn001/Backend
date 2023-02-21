const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Comment = new Schema({
    Name: {
        type: String,
        required: true
    },
    School: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    Level: {
        type: String,
        required: true
    },
    Comment: {
        type: String,
        required: true
    },
    
},{ timestamps: true });
module.exports = mongoose.model('Comment', Comment);