//base route, take this as an example
const express = require('express');
const router = express.Router();

// "/" in this case would be the route's main place. Example:
// If the route is being used on /something/somestuff, then "/" here would be /something/somestuff

// ".get" for the GET method
router.get("/", (req, res) => {
  // Do stuff
  res.render("views-file-name-here" /* It auto-adds .html at the end for you, DO NOT put .html */, { something: "something Else" } /* <--- context, variables accessible from the renderer */);
});

// You can use other methods too
// like POST
// But you're not forced to

router.post("/", (req, res) => {
  // Do stuff
  res.send("You have sent a POST!");
});

// And then export the router, and you're done!

module.exports = router;

