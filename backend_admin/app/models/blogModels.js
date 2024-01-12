const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

    section: {
        type: String,
        default: ""
    },

    title: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        default: ""
    },



    description: {
        type: String,
        default: ""
    },

    comment: {
        type: String,
        default: "",
    },

    cover: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    },


})

const Blog = mongoose.model('Blog', dataSchema);


module.exports = Blog;


