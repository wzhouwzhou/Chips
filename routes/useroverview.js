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
          "/activity/github-activity.css"
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
