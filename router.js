const router = require('express').Router();
const { create, findAllUsers } = require('./controllers/user');

router.post('/register', create);
router.get('/users', findAllUsers);

module.exports = router;
