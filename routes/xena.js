// Main chips info
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('xena', { timestamp: new Date().toString() });
});

module.exports = router;
