const router = require("express").Router();
const {
  createReview,
  findReviews,
  findAllReviews,
  findReviewsAverage
} = require("../controllers/review");

router
  .post("/", createReview)
  .get("/", findAllReviews)
  .get("/record/:recordId", findReviews)
  .get("/record/average/:recordId", findReviewsAverage);

module.exports = router;
