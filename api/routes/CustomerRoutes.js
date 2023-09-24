module.exports = function (app) {
  const { Auth } = require("../middleware/auth");
  const CustomerController = require("../controllers/CustomerController");

  // app.post("/add-job", [Auth], CustomerController.addJob);
  // app.post("/apply-job", [Auth], CustomerController.applyJob);
  // app.get("/get-job-req", [Auth], CustomerController.getJobReq);
  // app.put("/update-job-req/:reqId", [Auth], CustomerController.updateJobReq);
  // app.get("/get-filtered-job-req", [Auth], CustomerController.getFilteredJobReq);

  // wedding planning new routes
  app.get("/get-all-users-api", [Auth], CustomerController.getAllUsers);
  app.post("/delete-user", [Auth], CustomerController.deleteUser);

  app.post("/add-new-post", [Auth], CustomerController.addNewPost);
  app.get("/get-all-posts", [Auth], CustomerController.getAllPosts);
  app.post("/delete-post", [Auth], CustomerController.deletePost);
};
