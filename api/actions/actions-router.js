const express = require("express");
const Actions = require("./actions-model");
const {
  validateActionsId,
  validateActionsFields,
} = require("./actions-middlware");
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

router.post("/", validateActionsFields, async (req, res, next) => {
  try {
    res.status(201).json(await Actions.insert(req.body));
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateActionsId,
  validateActionsFields,
  async (req, res, next) => {
    try {
      await Actions.update(req.params.id, req.body);
      res.status(200).json(req.body);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateActionsId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.status(200).json(null);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
