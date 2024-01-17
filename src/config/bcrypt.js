const bcrypt = require("bcrypt");

function hashPass(password) {
  const saltRounds = 7;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}

module.exports = { hashPass };
