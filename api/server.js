const express = require('express');
const server = express();
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(errorHandling);

module.exports = server;

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  });
}
