// Error
const express = require('express');
const router = express.Router();

router.get('/', (err, req, res) => {
  res.render('error', { type: err.status || 500, timestamp: new Date().toString() });
});

module.exports = router;
