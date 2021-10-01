const Projects = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({ status: 404, message: "Project not found" });
    }
  } catch (err) {
    next(err);
  }
}

function validateProjectBody(req, res, next) {
  const { name, description } = req.body;
  if (
    !name ||
    typeof name !== "string" ||
    !name.trim() ||
    !description ||
    typeof description !== "string" ||
    !description.trim()
  ) {
    next({ status: 400, message: "missing required field" });
  } else {
    next();
  }
}

function validateCompletedField(req, res, next) {
  if (req.body.completed === undefined) {
    next({ status: 400, message: "missing required field" });
  } else {
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProjectBody,
  validateCompletedField,
};
