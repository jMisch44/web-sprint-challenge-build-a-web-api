const express = require("express");
const Projects = require("./projects-model.js");
const {
  validateProjectId,
  validateProjectBody,
} = require("./projects-middleware.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await Projects.get());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateProjectId, async (req, res, next) => {
  try {
    res.status(200).json(req.project);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateProjectBody, async (req, res, next) => {
  try {
    res.status(201).json(await Projects.insert(req.body));
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateProjectId,
  validateProjectBody,
  async (req, res, next) => {
    try {
      res.status(200).json(await Projects.update(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.status(200).json(null);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    res.status(200).json(await Projects.getProjectActions(req.params.id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
