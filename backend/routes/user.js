const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../model/user");
const auth = require("../middleware/auth");
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

// POST Logout User.
router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// POST Upload Profile Picture.
const upload = multer({
  limits: {
    fileSize: 2097152, //2MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Please upload an image file (.png, .jpg, .jpeg)"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/user/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// GET User Profile.
router.get("/user", auth, async (req, res) => {
  res.send(req.user);
});

// GET User Profile Picture.
router.get("/user/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
