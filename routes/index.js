// main chips info
const express = require('express');
const router = express.Router();
const snek = require('snekfetch');

router.get("/", (req, res) => {
  snek.get('http://localhost:8880/api/guildcount').then(resp => {
    res.render("index", {
      timestamp: new Date().toString(),
      servercount: resp.body?resp.body.count:450,
    });
  });
});

module.exports = router;
