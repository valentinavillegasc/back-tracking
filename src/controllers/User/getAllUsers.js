const { User, Book, Tracker } = require("../../db");

const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      include: [Book, Tracker],
    });

    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = getAllUsers;
