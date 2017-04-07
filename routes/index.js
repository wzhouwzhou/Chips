// index
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { timestamp: new Date().toString(), scripts: [
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js",
    "/vendor/magnific-popup/jquery.magnific-popup.min.js",
    "/vendor/scrollreveal/scrollreveal.js",
    "/js/creative.min.js",
  ], stylesheets: [
    "/vendor/font-awesome/css/font-awesome.min.css", 
    "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800",
    "https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic",
    "/vendor/magnific-popup/magnific-popup.css",
    "/css/creative.min.css"
  ], bodyid: "page-top"});
});

module.exports = router;
