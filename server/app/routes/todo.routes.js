


module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });


const {
  //getTodosById,
  getAllTodos,
  CreateTodo,
  DeleteTodo,
  getTodosByUser,
  //DeleteTodo,
  //UpdateTodo,
} = require("../controllers/note.controller");

const { protect } = require("../middleware/authMiddleware.js");


  app.get("/api/todo/",getAllTodos);

  //app.get("/api/todo/:id",getTodosById);
  app.put("/api/todo/createTodo",[protect],CreateTodo);
  app.delete("/api/todo/delete/:id",DeleteTodo);
  app.get("/api/todo/mytodo",getTodosByUser);


  };  

/*
router.route("/").get(protect, getAllTodo);
router
  .route("/:id")
  .get(getTodosById)
  .delete(protect, DeleteTodo)
  .put(protect, UpdateTodo);
router.route("/create").post(protect, CreateTodo);

*/