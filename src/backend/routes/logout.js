var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var session = require('express-session');

router.delete('/', function(req, res, next) {
  req.session.destroy();
  res.status(200).send('Session Delete');
});

module.exports = router;
