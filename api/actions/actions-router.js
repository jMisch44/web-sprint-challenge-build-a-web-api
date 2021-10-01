// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const { validateActionsId } = require("./actions-middlware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await Actions.get());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateActionsId, (req, res, next) => {
  try {
    res.status(200).json(req.action);
  } catch (err) {
    next(err);
  }
});

// router.post("/", (req, res, next) => {

// })

module.exports = router;
