const Actions = require("./actions-model");

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

module.exports = {
  validateActionsId,
};
