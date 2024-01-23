const { Book } = require("../../db");
const cloudinary = require("../../config/cloudinary");

const updateBook = async (
  id,
  cover,
  title,
  author,
  pages,
  startDate,
  endDate,
  genre,
  format,
  sinopsis,
  review,
  quotes,
  stars
) => {
  try {
    const book = await Book.findOne({ where: { id } });

    if (!book) {
      throw new Error("Book not found");
    } else {
      // Actualizar la imagen en Cloudinary si se proporciona una nueva imagen
      if (cover) {
        const cloudinaryResponse = await cloudinary.uploader.upload(cover, {
          folder: "covers", // Carpeta en Cloudinary donde se almacenarán las imágenes
        });

        book.cover = cloudinaryResponse.secure_url;
      }

      // Actualizar otros campos del colibrí
      book.title = title || book.title;
      book.author = author || book.author;
      book.pages = pages || book.pages;
      book.startDate = startDate || book.startDate;
      book.endDate = endDate || book.endDate;
      book.format = format || book.format;
      book.genre = Array.isArray(genre) ? genre : book.genre;
      book.quotes = Array.isArray(quotes) ? quotes : book.quotes;

      book.sinopsis = sinopsis || book.sinopsis;
      book.review = review || book.review;

      book.stars = stars || book.stars;

      // Guardar los cambios en la base de datos
      await book.save();

      return book;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = updateBook;
