const mongoose = require('mongoose');


const Todo =  mongoose.model('Todo',
    {
    title: {
        type: String,
        required: true
    },

    content: {
      type: String,
      required: true,

    },
    done: {

        type: Boolean,
        required: true,
        default: false,

    },

    userName: {
        type: String,
        required: true
    },

});

module.exports = Todo;