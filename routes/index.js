// Main chips info
const express = require('express');
const router = express.Router();
const snek = require('snekfetch');

router.get('/', (req, res) => {
  snek.get('http://localhost:8880/api/guildcount').then(gc => {
    snek.get('http://localhost:8880/api/membercount').then(mc => {
      res.render('index', {
        timestamp: new Date().toString(),
        servercount: gc.body ? gc.body.count : 500,
        // Fallback on Nov 1 14:48 PM stats
        membercount: mc.body ? mc.body.count > 106000 ? mc.body.count : 106422 : null,
      });
    });
  });
});

module.exports = router;
