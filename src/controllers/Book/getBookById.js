const { Book } = require("../../db");

const getBookById = async (id) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) throw new Error("Book not found");

    return book;
  } catch (error) {
    throw error;
  }
};

module.exports = getBookById;
