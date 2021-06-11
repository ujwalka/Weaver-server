const Nest = require('../models/nest');
const User = require('../models/user');

const createNest = async (req, res) => {
  const { description, userId } = req.body;
  try {
    const nest = await Nest.create({
      description,
    });
    await User.findOneAndUpdate({ _id: userId }, { $push: { nest: nest._id } });
    res.status(201).send(nest);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create nest' });
  }
};
const getAllNests = async (req, res) => {
  const { userId } = req.params;
  try {
    const nests = await User.findOne({ _id: userId }).populate('nest').exec();
    res.status(201).send(nests);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not get nests' });
  }
};

const deleteNest = async (req, res) => {
  const { nestId, userId } = req.body;
  try {
    await Nest.findOneAndDelete({ _id: nestId });
    await User.findOneAndUpdate({ _id: userId }, { $pull: { nest: nestId } });
    res.status(201).send();
  } catch (error) {
    res.status(400).send({ error, message: 'Could not delete nest' });
  }
};

module.exports = { createNest, deleteNest, getAllNests };
