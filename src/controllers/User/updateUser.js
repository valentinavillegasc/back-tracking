const { User } = require("../../db");
const bcrypt = require("bcrypt");

const updateUser = async (
  id,
  fullname,
  email,
  currentPassword,
  newPassword
) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    if (currentPassword) {
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid current password");
      }
    }

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.password = newPassword || user.password;

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = updateUser;
