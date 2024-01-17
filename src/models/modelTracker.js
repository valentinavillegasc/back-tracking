const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Tracker",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      startPage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endPage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPagesRead: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
