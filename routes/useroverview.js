// user
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  if(req.user!=null)
    res.render("useroverview",
      { timestamp: new Date().toString(),
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        avatarURL: req.user.avatarURL
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
