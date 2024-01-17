const { User, Book } = require("../../db");

const getBooksByUserId = async (userId) => {
  try {
    const user = await User.findByPk(userId, { include: [Book] });

    if (!user) {
      throw new Error("User not found");
    }

    return user.Books;
  } catch (error) {
    throw error;
  }
};

module.exports = getBooksByUserId;
