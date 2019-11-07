const { Schema, model } = require("mongoose");
const uuidv1 = require("uuid/v1");

const reviewSchema = new Schema({
  review_id: String,
  userid: String,
  review_datetime: Date,
  rating: Number,
  comment_title: String,
  created_on: Date,
  comment: String,
  record_id: String
});

reviewSchema.pre("save", function(next) {
  this.review_datetime = new Date();
  this.created_on = new Date();
  this.review_id = uuidv1();

  next();
});

module.exports = model("Review", reviewSchema);
