// index
const express = require('express');
const router = express.Router();
const stylesheets: ["/vendor/font-awesome/css/font-awesome.min.css"]

router.get("/", (req, res) => {
  res.render("index", { timestamp: new Date().toString(),stylesheets:stylesheets });
});

module.exports = router;
