const express = require("express");
const Book = require("../model/book");
const router = new express.Router();

// GET Books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
