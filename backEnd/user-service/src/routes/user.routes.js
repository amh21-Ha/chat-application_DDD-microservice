const express = require('express');
const UserService = require('../application/user.service');

const router = express.Router();
const userService = new UserService();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await userService.register(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
