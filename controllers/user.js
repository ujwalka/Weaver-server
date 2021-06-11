require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');

const SECRET = process.env.WS_SECRET_KEY;

const findAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log('error from get all', error);
    res.status(404).end();
  }
};

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

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

const findUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error();
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ error: '404', message: 'User not found' });
  }
};

const validateToken = async (req, res) => {
  const { token } = req.body;
  try {
    const isTokenValid = jwt.verify(token, SECRET);
    res.status(200).send({ isValid: true });
  } catch (error) {
    res.status(401).send({ error: '401', message: 'Token id invalid' });
  }
};

module.exports = { create, findAllUsers, login, validateToken, findUser };
