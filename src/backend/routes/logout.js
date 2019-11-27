let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let session = require('express-session');

router.delete('/', function(req, res, next) {
  req.session.destroy();
  res.status(200).send('Session Delete');
});

module.exports = router;
