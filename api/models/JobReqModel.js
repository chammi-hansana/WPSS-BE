let mongoose = require("mongoose");
const StatusType = require("../enums/StatusType");

let Schema = mongoose.Schema;

let JobReqModelSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id field is required!"],
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: [true, "Job id field is required!"],
  },
  status: {
    type: String,
    enum: StatusType,
    default: StatusType.PENDING,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const JobReq = mongoose.model("JobReq", JobReqModelSchema);
module.exports = { JobReq };
