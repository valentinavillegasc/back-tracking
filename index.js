const app = require("./src/app");
const { database } = require("./src/db");
const port = process.env.PORT || 3001;
database.sync();
app.listen(3001, () => {
  console.log(`Listening on port ${port}!`);
});
