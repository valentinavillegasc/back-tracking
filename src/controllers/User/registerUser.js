const { User } = require("../../db");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendConfirmationEmail = require("../../config/mailConfig");

const createNewUser = async (fullname, email, password) => {
  if (!fullname || !email || !password) throw new Error("Missing information");

  try {
    let alredyExist = await User.findOne({ where: { email } });

    if (alredyExist) {
      if (alredyExist.confirmEmail === false) {
        await alredyExist.destroy({ force: true });
      } else {
        throw new Error("Email already registered");
      }
    }

    const confirmationToken = crypto.randomBytes(20).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    const newRegister = await User.create({
      fullname,
      email,
      password: hashedPassword,
      confirmationToken,
    });

    sendConfirmationEmail(newRegister.email, confirmationToken);

    return newRegister;
  } catch (error) {
    throw error;
  }
};

module.exports = createNewUser;
