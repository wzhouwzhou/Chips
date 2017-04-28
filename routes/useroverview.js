// user
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  if(req.user!=null)
    res.render("useroverview",
      { timestamp: new Date().toString(),
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        avatarURL: req.user.avatarURL,
        scripts: [
          "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.7.2/mustache.min.js",
          "/activity/github-activity.js"
        ], sheets: [
          "https://cdnjs.cloudflare.com/ajax/libs/octicons/2.0.2/octicons.min.css",
          "/activity/github-activity.css",
          "/assets/plugins/bootstrap/bootstrap.css",
          "/assets/font-awesome/css/font-awesome.css",
          "/assets/plugins/pace/pace-theme-big-counter.css",
          "/assets/css/style.css",
          "/assets/css/main-style.css",
          //Page level css
          "/assets/plugins/morris/morris-0.4.3.min.css"
        ]//,
        //ujson: res.json(req.user)
      }
    );
  else
    res.render("useroverview",
      { timestamp: new Date().toString(),
        isAuthenticated: req.isAuthenticated()
      }
    );
});

module.exports = router;
