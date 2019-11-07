/* eslint-disable camelcase */
const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  const { userid, rating, comment_title, comment, record_id } = req.body;

  if (!userid || !rating || !comment_title || !comment || !record_id)
    return res
      .status(400)
      .json({ error: { message: "Please provide all required data" } });

  const review = new Review({
    userid,
    rating,
    comment_title,
    comment,
    record_id
  });
  await review.save();

  return res
    .status(201)
    .json({ message: "Review created successfully", Review });
};

exports.findReviews = async (req, res) => {
  const { recordId } = req.params;
  const reviews = await Review.find({ record_id: recordId }).select("-_id");

  return res.status(200).json(reviews);
};

exports.findAllReviews = async (req, res) => {
  const reviews = await Review.find().select("-_id");

  return res.status(200).json(reviews);
};

exports.findReviewsAverage = async (req, res) => {
  const { recordId } = req.params;

  const [avg] = await Review.aggregate([
    { $match: { record_id: recordId } },
    { $group: { _id: recordId, average: { $avg: "$rating" } } }
  ]);

  return res.status(200).json(avg);
};
