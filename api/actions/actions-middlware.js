const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

async function validateActionsId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      req.action = action;
      next();
    } else {
      next({ status: 404, message: "action not found" });
    }
  } catch (err) {
    next(err);
  }
}

async function validateActionsFields(req, res, next) {
  const { description, notes, project_id } = req.body;
  try {
    const project = await Projects.get(project_id);
    if (!description || !notes || !project) {
      next({ status: 400, message: "Required field missing" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateActionsId,
  validateActionsFields,
};
