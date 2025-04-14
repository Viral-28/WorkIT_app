const Post = require('../models/post');
const User = require('../models/user.model');
const Comment = require('../models/comment');

//get post by tags
exports.getTagPost = (req, res) => {

    Post.find({"tag":req.query.tagname}).then(documents => {
        if(documents){
             res.status(200).json({
                message: "Posts fetched successfully!",
                posts: documents
            });
        }
        else{
             res.status(404).json({ message: "Post not found!" });
        }
       
    })
}

//get all posts
exports.getAllPost = (req, res) => {
Post.find().populate("comments").then(documents => {
    if(documents){
         res.status(200).json({
            message: "All Posts fetched successfully!",
            posts: documents
        });
    }
    else{
         res.status(404).json({ message: "Post not found!" });
    }
})
}
//post comment on blog
exports.postComment = (req, res) => {
    const comment = new Comment();
    comment.id=req.body.id,
    comment.userName= req.body.userName;
    comment.comment=req.body.comment;

    comment.save()
    .then((result) => {
      Post.findOne({ _id: req.body.id }, (err, post) => {
          if (post) {
              // The below two lines will add the newly saved review's 
              // ObjectID to the the User's reviews array field
              post.comments.push(comment);
              post.save();
              //res.json({ message: 'Comment created!' });
          }
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

    Post.findOne({ _id: req.body.id })
    .populate("comments")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

   
}
//add blog
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
        res.status(500).json({ error });
      });
    
  }
//get posts by UserName
  exports.getPosts = (req, res) => {
    User.findOne({ userName: req.query.userName })
      .populate({path:"posts", populate : {
        path : 'comments'}
      })
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };
  

  exports.getPostById = (req, res) => {
    Post.findOne({ _id: req.query.id })
     
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };
  
