const mongoose = require("mongoose");
const Book = require("../model/book");
const { paginate } = require("./paginate");

mongoose.connect("mongodb://127.0.0.1:27017/book-store-api");

const addBook = async (file, title, author, year) => {
  const content = await paginate(file).then((response) => response);

  const book = new Book({
    title,
    author,
    year,
    content,
  });

  book.save();
};

addBook("./1984.txt", "1984", "George Orwell", 1949);
