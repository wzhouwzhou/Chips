// User
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', { timestamp: new Date().toString() });
});

module.exports = router;
