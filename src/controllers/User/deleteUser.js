const { User } = require("../../db");

const deleteUser = async (id) => {
  try {
    const user = await User.destroy({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    } else {
      return "deleted!";
    }
  } catch (error) {
    throw error;
  }
};

module.exports = deleteUser;
