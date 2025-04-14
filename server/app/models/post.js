const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    tag: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: false
    },

    postDate: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],


    //creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});


module.exports = Post