var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var projectsRouter = require("./routes/projects");
var skillsRouter = require("./routes/skills");
var authRouter = require("./routes/auth");

const cors = require("cors");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/skills", skillsRouter);
app.use("/", authRouter);
app.use("/", indexRouter);
module.exports = app;
