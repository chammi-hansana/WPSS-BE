// const { Booking } = require("../models/BookingModel");
// const { Place } = require("../models/PlaceModel");
// const { TripPricing } = require("../models/TripPricingModel");

exports.getBookings = (req, res) => {
  Booking.find(function (err, bookings) {
    if (err) {
      return res.status(422).json({
        success: false,
        message: "Unable to retrieve bookings!",
        data: err,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Received bookings!",
      data: bookings,
    });
  });
};

exports.addPlace = async (req, res) => {
  let newPlace = new Place(req.body);
  console.log("new place adding", req.body);

  await newPlace.save((err, place) => {
    if (err) {
      return res.status(422).json({
        success: false,
        message: "Unable to create place!",
        data: err,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "New place is created!",
        data: place,
      });
    }
  });
};

exports.deletePlace = (req, res) => {
  Place.deleteOne({ _id: req.params.id }, function (err, place) {
    if (err) {
      return res.status(422).json({
        success: false,
        message: "Error occured while procesing the request!",
      });
    }
    if (!place) {
      return res.status(422).json({
        success: false,
        message: "Invalid place id!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Place deleted!",
      data: place,
    });
  });
};

exports.updateBooking = (req, res) => {
  Booking.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true },
    function (err, booking) {
      if (err) {
        return res.status(422).json({
          success: false,
          message: "Error occured while processing the request",
        });
      }

      if (!booking) {
        return res.status(422).json({
          success: false,
          message: "Invalid booking id!",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Booking updated!",
        data: booking,
      });
    }
  );
};

exports.addTripPricing = (req, res) => {
  let newTripPricing = new TripPricing(req.body);
  console.log("new trip pricing adding", req.body);

  newTripPricing.save((err, pricing) => {
    if (err) {
      return res.status(422).json({
        success: false,
        message: "Unable to add pricing!",
        data: err,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "New pricing is added!",
        data: pricing,
      });
    }
  });
};

exports.updateTripPricing = (req, res) => {
  TripPricing.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true },
    function (err, pricing) {
      if (err) {
        return res.status(422).json({
          success: false,
          message: "Error occured while processing the request",
        });
      }

      if (!pricing) {
        return res.status(422).json({
          success: false,
          message: "Invalid trip pricing id!",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Pricing updated!",
        data: pricing,
      });
    }
  );
};
