const { User } = require("../../db");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Missing information");
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.confirmed === false) {
      throw new Error("Please confirm your email");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return {
        message: "Login successful",
        userId: user.id,
        fullname: user.fullname,
        email: user.email,
        password: user.password,
      };
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = login;
