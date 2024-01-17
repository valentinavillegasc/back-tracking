const bookRouter = require("express").Router();
const uploadMiddleware = require("../handlers/uploadMiddleware");
const createBook = require("../controllers/Book/createBook");
const getBookById = require("../controllers/Book/getbookbyId");
const deleteBook = require("../controllers/Book/deleteBook");
const updateBook = require("../controllers/Book/updateBook");

//! Get book by ID
bookRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await getBookById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//! Create book
bookRouter.post("/", uploadMiddleware, async (req, res) => {
  const {
    title,
    author,
    pages,
    startDate,
    endDate,
    gender,
    format,
    sinopsis,
    review,
    quotes,
    stars,
    UserId,
  } = req.body;
  const { buffer: cover } = req.file;
  try {
    const newBook = await createBook(
      cover,
      title,
      author,
      pages,
      startDate,
      endDate,
      gender,
      format,
      sinopsis,
      review,
      quotes,
      stars,
      UserId
    );
    res.status(200).json({ message: "created", data: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//! Update book
bookRouter.put("/:id", uploadMiddleware, async (req, res) => {
  const { id } = req.params;
  const {
    title,
    author,
    pages,
    startDate,
    endDate,
    gender,
    format,
    sinopsis,
    review,
    quotes,
    stars,
    cover,
  } = req.body;

  try {
    const book = await updateBook(
      id,
      cover,
      title,
      author,
      pages,
      startDate,
      endDate,
      gender,
      format,
      sinopsis,
      review,
      quotes,
      stars
    );

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//! Delete book
bookRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await deleteBook(id);
    res.status(200).json({ message: "Deleted", data: book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = bookRouter;
