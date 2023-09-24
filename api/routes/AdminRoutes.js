module.exports = function (app) {
  const { Auth } = require("../middleware/auth");
  const { Admin } = require("../middleware/admin");

  const AdminController = require("../controllers/AdminController");

  // app.get("/get_bookings", [Auth, Admin], AdminController.getBookings);
  // app.post("/add_place", [Auth, Admin], AdminController.addPlace);
  // app.delete("/delete_place/:id", [Auth, Admin], AdminController.deletePlace);
  // app.put("/update_booking/:id", [Auth, Admin], AdminController.updateBooking);

  // app.post("/add_trip_pricing", [Auth, Admin], AdminController.addTripPricing);
  // app.put(
  //   "/update_trip_pricing/:id",
  //   [Auth, Admin],
  //   AdminController.updateTripPricing
  // );
};
