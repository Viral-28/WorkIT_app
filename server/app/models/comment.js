const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', {
    
    userName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
  
});


module.exports = Comment