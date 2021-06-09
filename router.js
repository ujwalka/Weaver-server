const router = require('express').Router();
const { create } = require('./controllers/user');

router.post('/register', create);

module.exports = router;
