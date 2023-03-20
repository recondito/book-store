const fs = require("fs").promises;
const path = require("path");

// The Paginate function works by reading the book from a plain text file and splitting it by lines of text.
// This leads to an array that contains the total amount of lines that the book has (see 'lines' array).
// A regular sized paperback book page is composed of 35 lines of text.
// The 'lines' array is then spliced every 35 elements (Each element being a line of text) and the spliced array is pushed into the pages array.
// The 'pages' array contains arrays each with up to 35 elements, each element representing a line of text, and each array representing a page.
// The paramater to receive is, for the purpose of this project, a text file path.

const paginate = async (file) => {
  try {
    const data = await fs.readFile(file, "utf8");
    const lines = data.match(/\S.{1,100}(?=\s|$)/g);

    let pages = [];
    let line;
    while ((line = lines.splice(0, 35)).length) pages.push(line.join("\n"));
    return pages;
  } catch (error) {
    console.log(error);
  }
};

// console.log(
//   paginate("../tests/1984.txt").then((response) => console.log(response[0]))
// );

module.exports = {
  paginate,
};
