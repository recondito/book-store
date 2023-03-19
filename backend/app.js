const express = require("express");
const bookRouter = require("./routes/book");
require("./database/connection");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bookRouter);

module.exports = app;
