require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;
const modelBook = require("./models/modelBook");
const modelTracker = require("./models/modelTracker");
const modelUser = require("./models/modelUser");

const database = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, force: false }
);

modelBook(database);
modelTracker(database);
modelUser(database);

const { Book, Tracker, User } = database.models;

User.belongsToMany(Book, { through: "UsersBooks", timestamps: false });
Book.belongsTo(User, { through: "UsersBooks", timestamps: false });

User.belongsToMany(Tracker, { through: "UsersTrack", timestamps: false });
Tracker.belongsTo(User, { through: "UsersTrack", timestamps: false });

module.exports = { database, ...database.models };
