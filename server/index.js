const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const Users = require("./model/Users");
const Posts = require("./model/Posts");
const multer = require('multer');
const path = require('path');

const app = express();
//public folder 
app.use(express.static('./public'));

// Connect to db
mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => console.log("Successfully connected to database"))
    .catch(err => console.log(err));

// Middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());



//Routes

app.use("/users", require("./routes/api/users"));
app.use("/users", require("./routes/api/following"));
app.use("/moderator", require("./routes/api/moderator"));
app.use("/users", require("./routes/api/followRecommendation"));
app.use("/users", require("./routes/api/post"));
//app.use("/users", require("./routes/api/hotTopics"));
app.use("/moderator", require("./moderators"));
app.use("/users", require("./routes/api/notification"));
app.use("/users", require("./routes/api/search"));
app.use("/users", require("./routes/api/account"));
app.use("/users", require("./routes/api/message"));
app.use("/users", require("./routes/api/hotpost"));
app.use("/users", require("./routes/api/forgot"));

const port = process.env.PORT || 5000;
app.listen(port, () =>
    console.log(`The server is running on the port ${port}`)
);