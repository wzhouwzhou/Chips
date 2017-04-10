// user
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render("user", { timestamp: new Date().toString() });
});

module.exports = router;
