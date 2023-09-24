// const { Booking } = require("../models/BookingModel");
const { Post } = require("../models/PostModel");
const { JobReq } = require("../models/JobReqModel");
const { User } = require("../models/UserModel");

exports.addJob = async (req, res) => {
  let newJob = new Job(req.body);
  console.log("new job adding", req.body);

  await newJob.save((err, job) => {
    if (err) {
      return res.status(422).json({
        success: false,
        message: "Unable to create job!",
        data: err,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "New job is created!",
        data: job,
      });
    }
  });
};

exports.getAllPosts = (req, res) => {
  Post.find(function (err, posts) {
    if (err) {
      console.log('err', err);
      // return res.status(422).json({
      //   success: false,
      //   message: "Unable to retrieve posts!",
      //   data: err,
      // });
    } else {
      console.log('p', posts);
      return res.status(200).json({
        success: true,
        message: "Received posts!",
        data: posts,
      });
    }
  });
};


exports.applyJob = async (req, res) => {
  let newJob = new JobReq(req.body);
  console.log("new job req adding", req.body);

  await newJob.save((err, job) => {
    if (err) {
      return res.status(422).json({
        success: false,
        message: "Unable to create job req!",
        data: err,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "New job req is created!",
        data: job,
      });
    }
  });
};

exports.addNewPost = async (req, res) => {
  let addNewPost = new Post(req.body);
  console.log("new job adding", req.body);

  // save post in jobs collection in mongodb
  await addNewPost.save((err, post) => {
    if (err) {
      return res.status(422).json({
        success: false,
        message: "Unable to create post!",
        data: err,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "New post is created!",
        data: post,
      });
    }
  })

}

exports.getJobReq = async (req, res) => {
  const userId = String(req.user._id);
  console.log("userId", req.user._id);

  if (!req.query.jobId) {
    // for job seeker
    try {
      await JobReq.find({ user_id: userId }).populate('user_id').populate('job_id').exec((error, job) => {
        if (!job) {
          return res.status(404).json({
            success: false,
            message: "job req not found",
          });
        }
        return res.status(200).json({
          success: true,
          message: "job req found!",
          data: job,
        });
      });
    } catch (error) {
      console.log("error")
    }
  } else {
    try {
      await JobReq.find({ job_id: req.query.jobId }).populate('user_id').populate('job_id').exec((error, job) => {
        if (!job) {
          return res.status(404).json({
            success: false,
            message: "job req not found",
          });
        }
        return res.status(200).json({
          success: true,
          message: "job req found!",
          data: job,
        });
      });
    } catch (error) {
      console.log("error")
    }
  }



};

exports.updateJobReq = (req, res) => {
  JobReq.findOneAndUpdate(
    { _id: req.params.reqId },
    { $set: req.body },
    { new: true },

    function (err, job) {
      if (err) {
        return res.status(422).json({
          success: false,
          message: "Error occured while processing the request",
        });
      }

      if (!job) {
        return res.status(422).json({
          success: false,
          message: "Invalid job id!",
        });
      }

      JobReq.findOne({ _id: req.params.reqId }, function (err, job) {
        if (err) {
          return res.status(422).json({
            success: false,
            message: `Unable to retrieve the job! ${req.params.jobId}`,
            data: err,
          });
        }
      });

      return res.status(200).json({
        success: true,
        message: "Job updated!!",
        data: job,
      });
    }
  )
  // .populate({path: 'user_id', select: ''}).then(());
};

exports.getFilteredJobReq = async (req, res) => {

  try {
    await JobReq.find({}).populate('user_id').populate('job_id').exec((error, job) => {
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "job req not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "job req found!",
        data: job,
      });
    });
  } catch (error) {
    console.log("error")
  }

};

exports.getAllUsers = (req, res) => {
  User.find(function (err, users) {
    if (err) {
      return res.status(422).json({
        success: false,
        message: "Unable to retrieve users!",
        data: err,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Received users!",
      data: users,
    });
  });
};

exports.deleteUser = (req, res) => {
  // try {
  //   User.deleteOne({ _id: req.body.user_id })
  //   res.status(200).json({ success: true, message: 'User successfully deleted !' })


  // } catch (error) {
  //   res.status(500).json({ success: false, error: error })
  // }

  User.deleteOne({ _id: req.body.user_id })
      .then(result => {
        if (result.deletedCount === 1) {
          console.log(`Document  deleted successfully.`);
          res.status(200).json({ success: true, message: 'User successfully deleted !' })
        } else {
          console.log(`Document not found.`);
          res.status(200).json({ success: false, message: `Document with ID ${idToDelete} not found.` })
        }
      })
      .catch(err => {
        console.error(err);
      })
};

exports.deletePost = (req, res) => {
  Post.deleteOne({ _id: req.body.post_id })
      .then(result => {
        if (result.deletedCount === 1) {
          console.log(`Document  deleted successfully.`);
          res.status(200).json({ success: true, message: 'Post successfully deleted !' })
        } else {
          console.log(`Document not found.`);
          res.status(200).json({ success: false, message: `Document with ID ${idToDelete} not found.` })
        }
      })
      .catch(err => {
        console.error(err);
      })
};