const express = require("express");
const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
require("./database/connection");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bookRouter);
app.use(userRouter);

module.exports = app;
