const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: (value) => value.replace(/\s+/g, " "),
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  content: {
    type: [String],
    required: true,
  },
});

bookSchema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "favoriteBooks",
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
