require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const companyRouter = require("./company/company-routers");
const ProjectsRouter = require("./projects/projects-router");
const TasksRouter = require("./tasks/tasks-router");
const NODE_ENV = process.env.NODE_ENV;

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/company", companyRouter);
app.use("/api/projects", ProjectsRouter);
app.use("/api/tasks", TasksRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

module.exports = app;
