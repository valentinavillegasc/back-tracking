const { User, Book } = require("../../db");
const cloudinary = require("../../config/cloudinary");
const fs = require("fs").promises;
const path = require("path");

const createBook = async (
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
) => {
  try {
    if (!title || !author || !pages) throw new Error("Missing information");

    const user = await User.findByPk(UserId);

    if (!user) throw new Error("User not found");

    const tempFilePath = path.join(__dirname, "tempFile.jpg");
    await fs.writeFile(tempFilePath, cover);

    const cloudinaryResponse = await cloudinary.uploader.upload(tempFilePath, {
      folder: "covers",
    });

    const newBook = await Book.create({
      cover: cloudinaryResponse.secure_url,
      title,
      author,
      pages,
      startDate,
      endDate,
      gender: Array.isArray(gender) ? gender : [gender],
      format,
      sinopsis,
      review,
      quotes: Array.isArray(quotes) ? quotes : [quotes],
      stars,
      UserId,
    });

    await user.addBook(newBook);

    return newBook;
  } catch (error) {
    throw error;
  }
};

module.exports = createBook;
