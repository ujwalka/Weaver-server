require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');

const SECRET = process.env.WS_SECRET_KEY;

const create = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

module.exports = { create };
