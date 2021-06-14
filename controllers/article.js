const Article = require('../models/article');
const Nest = require('../models/nest');

const createArticle = async (req, res) => {
  const { newsArticle, nestId } = req.body;
  try {
    const articlePost = await Article.create({
      newsArticle,
    });
    await Nest.findOneAndUpdate(
      { _id: nestId },
      { $push: { articles: articlePost._id } }
    );
    res.status(201).send(articlePost);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not post article' });
  }
};

const postStrawNote = async (req, res) => {
  const { articleId, note } = req.body;
  try {
    await Article.findOneAndUpdate(
      { _id: articleId },
      { $push: { notes: note } }
    );
    res.status(201).send();
  } catch (error) {
    res.status(400).send({ error, message: 'Could not post note' });
  }
};
const getAllStrawNotes = async (req, res) => {
  const { strawId } = req.params;
  try {
    const { notes } = await Article.findOne({ _id: strawId });
    res.status(201).send({ notes });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not get Chirps' });
  }
};
const getAllArticles = async (req, res) => {
  const { nestId } = req.params;
  try {
    const articles = await Nest.findOne({ _id: nestId })
      .populate('articles')
      .exec();
    res.status(201).send(articles);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not get articles' });
  }
};

const deleteArticle = async (req, res) => {
  const { nestId, articleId } = req.body;
  try {
    await Article.findOneAndDelete({ _id: articleId });
    await Nest.findOneAndUpdate(
      { _id: nestId },
      { $pull: { articles: articleId } }
    );
    res.status(201).send();
  } catch (error) {
    res.status(400).send({ error, message: 'Could not delete article' });
  }
};

module.exports = {
  createArticle,
  deleteArticle,
  postStrawNote,
  getAllArticles,
  getAllStrawNotes,
};
