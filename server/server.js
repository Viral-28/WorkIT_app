const express = require("express"); // for building rest apis
//import bodyParser from "body-parser";
const bodyParser = require("body-parser"); // parse request
const cors = require("cors"); // provides express middleware
//import cors from "cors";
// const dbConfig = require("./app/config/db.config");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


const url = 'mongodb+srv://webd:webd@cluster0.28koesv.mongodb.net/?retryWrites=true&w=majority';
const todoRoutes =  require('../server/app/routes/todo.routes');

const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

//TO-DO
// app.use("/api/notes",noteRoutes);



// routes
require("./app/routes/auth.routes")(app); // authentication route
//require("./app/routes/user.routes")(app); // authorization route
require("./app/routes/post")(app);
require("./app/routes/todo.routes")(app);
//app.use("/api/notes",todoRoutes);


// set port, listen for requests
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//app.use(...);

const db = require("./app/models");
//const Role = db.role;
//mongodb+srv://root:<password>@cluster0.dtfvd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// connects to mongodb port
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true});


const con = mongoose.connection;

con.on('open',() => {
   console.log("Connected..");

});
