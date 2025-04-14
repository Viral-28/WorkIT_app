const Note = require('../models/todo');
const User = require('../models/user.model');
const asyncHandler = require("express-async-handler");

// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private
// exports.getAllTodos = asyncHandler(async (req, res) => {
//   const notes = await Note.find({ user: req.user._id });
//   res.json(notes);
// });

exports.getAllTodos = (req,res) => {
Note.find().then(documents => {
     if(documents){
        res.status(200).json({
        message: "All Todos fetched successfully!",
        todos: documents

     });
     } 
     else{
        res.status(404).json({ message: "Todo not found!" });
   }



});
}



//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
exports.CreateTodo = (req, res) => {
      const todo = new Note();
      todo.title = req.body.title;
      todo.content = req.body.content;
      todo.userName = req.body.userName;
      todo.save()
      .then((result) => {
        User.findOne({ userName: todo.userName }, (err, user) => {
            if (user) {
                user.todos.push(todo);
                user.save();
                res.json({ message: 'Todo created!' });
            }
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    })
}



/*
exports.update = (req, res) => {
    const post = new Post();
    post.tag= req.body.tag;
    post.title=req.body.title;
    post.content= req.body.content;
    //imagePath: url + "/images/" + req.file.filename,
    post.userName= req.body.userName;
    post.postDate=req.body.postDate;
    post.save()
      .then((result) => {
        User.findOne({ userName: post.userName }, (err, user) => {
            if (user) {
                // The below two lines will add the newly saved review's 
                // ObjectID to the the User's reviews array field
                user.posts.push(post);
                user.save();
                res.json({ message: 'Review created!' });
            }
        });
      })
      .catch((error) => {
        console.log(error);
*/

exports.DeleteTodo = (req, res) => {
   Note.findById(req.params.id)
   .then((note)=> {
    if(note)
    {
    if (note.userName.toString() !== req.body.userName.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
      }

    else
    {
        note.remove();
        res.json({ message: "Note Removed" });


    }  
  }
  else 
  {
    res.status(404);
    throw new Error("Note not Found");


  }


   });
  
};




/*
  exports.getTodosByUser = (req, res) => {
    console.log(User.findOne({ userName: req.body.userName}).populate("todos"));
    User.findOne({ userName: req.body.userName}) /*req.query.userName
      .populate("todos"
      .then((result) => {
        console.log("Successfully got the todos")
        res.json(result);
      })
      .catch((error) => {
        console.log("couldnt find user");
        res.status(500).json({ error });
      });
*/


exports.getTodosByUser = async (req, res) => {
   await User.findOne({ userName: req.body.userName }).populate("todos")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  };
  

//export { getTodosById, getAllTodos, CreateTodo, DeleteTodo, UpdateTodo, getTodosByUser};