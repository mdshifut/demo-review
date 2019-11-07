const error = require("../middleware/error");
const notFound = require("../middleware/notFound");
const review = require("../routes/review");

module.exports = app => {
  app.use("/_api/reviews", review);
  app.use(notFound);

  app.use(error);
};
