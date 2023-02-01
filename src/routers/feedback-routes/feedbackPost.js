const express = require("express"),
  router = express.Router(),
  Feedback = require("../../models/feedback");

router.post("/feedback", async (req, res) => {
  const feedback = new Feedback(req.body);
  try {
    await feedback.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
