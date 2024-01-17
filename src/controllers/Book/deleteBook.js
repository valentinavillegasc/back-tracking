const { Book } = require("../../db");

const deleteBook = async (id) => {
  try {
    const book = await Book.destroy({ where: { id } });
    if (!book) throw new Error("Book not found");
    return book;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteBook;
