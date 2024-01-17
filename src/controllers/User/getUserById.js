const { User, Book, Tracker } = require("../../db");

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      include: [Book, Tracker],
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = getUserById;
