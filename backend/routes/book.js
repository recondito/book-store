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

// GET Book by ID
router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new Error();
    }
    res.send(book);
  } catch (e) {
    res.status(404).send(e);
  }
});

// GET Book Page
router.get("/books/:id/:page", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new Error();
    }
    res.send(book.content[req.params.page]);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
