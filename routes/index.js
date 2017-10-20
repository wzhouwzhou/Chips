// main chips info
const express = require('express');
const router = express.Router();
const snek = require('snekfetch');

router.get("/", (req, res) => {
  snek.get('http://localhost:8880/api/guildcount').then(gc => {
    snek.get('http://localhost:8880/api/membercount').then(mc => {
      res.render("index", {
        timestamp: new Date().toString(),
        servercount: gc.body?gc.body.count:450,
        membercount: mc.body?mc.body.count:null,
      });
    });
  });
});

module.exports = router;
