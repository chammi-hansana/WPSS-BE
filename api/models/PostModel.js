let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PostModelSchema = new Schema({
  category: {
    type: String,
    required: [true, "category is required!"],
  },
  name: {
    type: String,
    required: [true, "name is required!"],

  },
  details: {
    type: String,
    required: [true, "details is required!"],

  },
  price: {
    type: Number,
    required: [true, "price is required!"],
  },
  contact: {
    type: String,
    required: [true, "Contact phone is required!"],
  },

  location: {
    type: String,
    required: [true, "Location is required!"],
  },

  imageUrl: {
    type: String,
    required: [true, "imageUrl is required!"],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", PostModelSchema);
module.exports = { Post };
