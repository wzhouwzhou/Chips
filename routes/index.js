// index
const express = require('express');
const router = express.Router();
const stylesheets = [
  "/vendor/bootstrap/css/bootstrap.css",
  "/vendor/font-awesome/css/font-awesome.min.css",
  "/vendor/magnific-popup/magnific-popup.css",
  "/css/creative.min.css",
  "/vendor/font-awesome/css/font-awesome.min.css",
  "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800",
  "https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic"
];

const plugins = [
  "/vendor/bootstrap/js/bootstrap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js",
  "/vendor/scrollreveal/scrollreveal.js",
  "/vendor/magnific-popup/jquery.magnific-popup.min.js",
  "/js/creative.min.js"
]

router.get("/", (req, res) => {
  res.render("index", {
    timestamp: new Date().toString(),
    sheets: stylesheets,
    scripts: plugins
  });
});

module.exports = router;
