const router = require('express').Router();
const {
  deleteArticle,
  createArticle,
  getAllArticles,
  getAllStrawNotes,
  postStrawNote,
} = require('./controllers/article');
const {
  createNest,
  deleteNest,
  getAllNests,
  postNestNote,
  getAllNestNotes,
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
router.post('/straw/note', postStrawNote);

// gets Warbles
router.get('/notes/:nestId', getAllNestNotes);
// get chirps
router.get('/straw/notes/:strawId', getAllStrawNotes);
module.exports = router;
