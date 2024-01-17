const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      confirmationToken: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
