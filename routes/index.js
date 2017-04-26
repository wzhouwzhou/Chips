// index
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  if(req.user!=null)
    res.render("index", { timestamp: new Date().toString(), scripts: [
      "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js",
      "/vendor/magnific-popup/jquery.magnific-popup.min.js",
      "/vendor/scrollreveal/scrollreveal.js",
    ], sheets: [
      "/vendor/font-awesome/css/font-awesome.min.css",
      "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800",
      "https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic",
      "/vendor/magnific-popup/magnific-popup.css",
      "/css/creative.min.css"
    ], bodyid: "page-top",
    isAuthenticated: req.isAuthenticated(),
    user: req.user
    });
  else
    res.render("index", { timestamp: new Date().toString(), scripts: [
      "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js",
      "/vendor/magnific-popup/jquery.magnific-popup.min.js",
      "/vendor/scrollreveal/scrollreveal.js",
    ], sheets: [
      "/vendor/font-awesome/css/font-awesome.min.css",
      "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800",
      "https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic",
      "/vendor/magnific-popup/magnific-popup.css",
      "/css/creative.min.css"
    ], bodyid: "page-top"});
});

const ExpressBrute = require('express-brute');
let bruteforce = new ExpressBrute(new ExpressBrute.MemoryStore());
router.post('/',
  bruteforce.prevent, // error 429 if we hit this route too often
  function (req, res, next) {
    res.send('Success!');
  }
);
module.exports = router;
