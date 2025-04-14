const checkAuth = require("../middleware/checkAuth");
const { authjwt } = require("../middleware");
const controller = require("../controllers/post.controller");

// sets up routes for authentication

module.exports =  (app)=> {
  
    app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/post/tags",
    [authjwt.verifyToken],
    controller.getTagPost // get posts by tags
  );

  app.get(
    "/api/post/id",
    controller.getPostById // get posts by id
  );

  app.get(
    "/api/post/",
    controller.getAllPost // get all posts
  );


  app.put(
    "/api/post/comment",
    controller.postComment
  );//post a comment on blog
  app.put("/api/post/update",[authjwt.verifyToken], controller.update); //post a blog
  app.get(
    "/api/post/mypost/",[authjwt.verifyToken],
 
    controller.getPosts // get post by username
  );
  
};
