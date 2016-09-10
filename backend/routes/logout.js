var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
	req.session.reset();
	res.send(true);
  console.log("Client logged out");
});

module.exports = router;
