const router = require('express').Router();
const { create, findAllUsers, login } = require('./controllers/user');

router.post('/register', create);
router.post('/login', login);
router.get('/users', findAllUsers);

module.exports = router;
