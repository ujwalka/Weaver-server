const router = require('express').Router();
const {
  create,
  findAllUsers,
  login,
  validateToken,
} = require('./controllers/user');

router.post('/register', create);
router.post('/login', login);
router.post('/validateToken', validateToken);
router.get('/users', findAllUsers);

module.exports = router;
