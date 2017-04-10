// user
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render("user",
    { timestamp: new Date().toString(),
      isAuthenticated: req.isAuthenticated(),
      user:req.user,
      ujson: res.json(req.user)
    });
});

module.exports = router;
