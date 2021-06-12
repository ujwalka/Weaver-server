const router = require('express').Router();
const {
  deleteArticle,
  createArticle,
  postNote,
  getAllArticles,
} = require('./controllers/article');
const {
  createNest,
  deleteNest,
  getAllNests,
  postNestNote,
} = require('./controllers/nest');
const {
  create,
  findAllUsers,
  login,
  validateToken,
  findUser,
} = require('./controllers/user');

router.post('/register', create);
router.post('/login', login);
router.post('/validateToken', validateToken);

router.get('/users', findAllUsers);
router.post('/user', findUser);

router.get('/nest/:userId', getAllNests);
router.post('/nest', createNest);
router.delete('/nest', deleteNest);

router.get('/straw/:nestId', getAllArticles);
router.post('/straw', createArticle);
router.delete('/straw', deleteArticle);

router.post('/nest/note', postNestNote);
router.post('/straw/note', postNote);

module.exports = router;
