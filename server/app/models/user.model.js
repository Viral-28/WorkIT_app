
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  {
    userName: {
      type: String,
      required: false,
      
  },
  firstName: {
    type: String,
    required: true,
   
},
    lastName: {
        type: String,
        required: true,
        
    },
    emailId: {
      type: String,
      required: true,
      unique: true
  },

    password: {
        type: String,
        required: true
    },

    phoneNo: {
      type: String,
      required: true
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
   
});




module.exports = User;