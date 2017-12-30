// Main chips info
const express = require('express');
const router = express.Router();
const snek = require('snekfetch');

router.get('/', (req, res) => {
  snek.get('http://localhost:8880/api/guildcount').then(gc => {
    snek.get('http://localhost:8880/api/membercount').then(mc => {
      res.render('index', {
        timestamp: new Date().toString(),
        servercount: gc.body ? gc.body.count : 1064,
        // Fallback on Dec 30 15:52:32.653 EST stats
        membercount: mc.body ? mc.body.count > 179000 ? mc.body.count : 179907 : null,
      });
    });
  });
});

module.exports = router;
