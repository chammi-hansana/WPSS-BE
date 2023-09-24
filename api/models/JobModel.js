let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let JobModelSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User field is required!"],
  },
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  date: {
    type: String,
  },
  details: {
    type: String,
  },
  desc: {
    type: String,
    required: [true, "Description is required!"],
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
  },
  salary: {
    type: String,
    required: [true, "Salary is required!"],
  },
  duration: {
    type: String,
    required: [true, "Duration type is required!"],
  },
  contact: {
    type: String,
    required: [true, "Contact phone is required!"],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", JobModelSchema);
module.exports = { Job };
