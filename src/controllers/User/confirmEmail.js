const { User } = require("../../db");

const confirmEmail = async (token) => {
  const user = await User.findOne({
    where: { confirmationToken: token },
  });

  if (user) {
    user.confirmed = true;
    user.confirmationToken = null;
    await user.save();

    return { message: "Mail confirmed" };
  } else {
    throw new Error("Token not valid");
  }
};

module.exports = confirmEmail;
