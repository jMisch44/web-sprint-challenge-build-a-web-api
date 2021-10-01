const express = require('express');
const server = express();
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);
server.use(errorHandling);

module.exports = server;

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  });
}
