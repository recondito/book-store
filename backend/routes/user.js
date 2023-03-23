const express = require("express");
const User = require("../model/user");
const router = new express.Router();

// POST Sign Up User.
router.post("/user", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// POST Login User.
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
