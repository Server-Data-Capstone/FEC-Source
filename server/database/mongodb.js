require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/reviews', {useNewUrlParser: true, useUnifiedTopology: true});

const reviewsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  rating: Number,
  date: Number,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
  photos: {
    id: Number,
    url: String,
  },
  characteristics: {
    id: Number,
    product_id: Number,
    name: String,
    characteristics_reviews: {
      id: Number,
      value: Number,
    },
  },
});

const Reviews = new mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;
