// index
const express = require('express');
const router = express.Router();

router.get("/", (res, req) => {
  res.render("index", { timestamp: new Date().toString() });
});

module.exports = router;

