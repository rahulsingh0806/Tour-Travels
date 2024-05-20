// import Tour from "../models/Tour.js";

// // create new tour
// export const createTour = async (req, res) => {
//   const newTour = new Tour(req.body);
//   try {
//     const savedTour = await newTour.save();
//     res.status(200).json({
//       success: true,
//       message: "Successfully created",
//       data: savedTour,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to create. Try again" });
//   }
// };

// //update tour
// export const updateTour = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const updatedTour = await Tour.findByIdAndUpdate(
//       id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json({
//       success: true,
//       message: "Successfully updated",
//       data: updateTour,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update",
//     });
//   }
// };

// //delete tour
// export const deleteTour = async (req, res) => {
//   const id = req.params.id;

//   try {
//     await Tour.findByIdAndDelete(id);

//     res.status(200).json({
//       success: true,
//       message: "Successfully deleted",
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete",
//     });
//   }
// };
// //getSingle tour
// export const getSingleTour = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const tour = await Tour.findById(id).populate("reviews");

//     res.status(200).json({
//       success: true,
//       message: "Successful",
//       data: tour,
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: "not found",
//     });
//   }
// };
// //get All Tour
// export const getAllTour = async (req, res) => {
//   // for pagination
//   const page = parseInt(req.query.page);
//   try {
//     const tours = await Tour.find({})
//       .populate("reviews")
//       .skip(page * 8)
//       .limit(8);

//     res.status(200).json({
//       success: true,
//       count: tours.length,
//       message: "Successful",
//       data: tours,
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: "not found",
//     });
//   }
// };

// // get tour by search
// export const getTourBySearch = async (req, res) => {
//   // here 'i' means case sensitive
//   const city = new RegExp(req.query.city,"i");
//   const distance = parseInt(req.query.distance);
//   const maxGroupSize = parseInt(req.query.maxGroupSize);

//   try {
//     // gte meant greater than equal
//     const tours = await Tour.find({
//       city,
//       distance: { $gte: distance },
//       maxGroupSize: { $gte: maxGroupSize },
//     }).populate("reviews");

//     res.status(200).json({
//       success: true,
//       message: "Successful",
//       data: tours,
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: "not found",
//     });
//   }
// };

// //get Featured Tour
// export const getFeaturedTour = async (req, res) => {
//   try {
//     const tours = await Tour.find({ featured: true })
//       .populate("reviews")
//       .limit(8);
      
//     res.status(200).json({
//       success: true,
//       message: "Successful",
//       data: tours,
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: "not found",
//     });
//   }
// };

// // get tour counts
// export const getTourCount = async (req, res) => {
//   try {
//     const tourCount = await Tour.estimatedDocumentCount();

//     res.status(200).json({ success: true, data: tourCount });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "failed to fetch" });
//   }
// };

import Tour from "../models/Tour.js";

// Create a new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Tour successfully created",
      data: savedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create tour. Please try again.",
      error: err.message,
    });
  }
};

// Update a tour
export const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Tour successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update tour",
      error: err.message,
    });
  }
};

// Delete a tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Tour successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete tour",
      error: err.message,
    });
  }
};

// Get a single tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate("reviews");
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Tour successfully retrieved",
      data: tour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tour",
      error: err.message,
    });
  }
};

// Get all tours with pagination
export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 0;

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Tours successfully retrieved",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tours",
      error: err.message,
    });
  }
};

// Get tours by search
export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance, 10);
  const maxGroupSize = parseInt(req.query.maxGroupSize, 10);

  if (isNaN(distance) || isNaN(maxGroupSize)) {
    return res.status(400).json({
      success: false,
      message: "Invalid distance or max group size",
    });
  }

  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Tours successfully retrieved",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tours",
      error: err.message,
    });
  }
};

// Get featured tours
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Featured tours successfully retrieved",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve featured tours",
      error: err.message,
    });
  }
};

// Get tour count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ 
      success: true, 
      data: tourCount 
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tour count",
      error: err.message,
    });
  }
};

// // get tour counts
// export const getTourCount = async (req, res) => {
//   try {
//     const tourCount = await Tour.estimatedDocumentCount();

//     res.status(200).json({ success: true, data: tourCount });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "failed to fetch" });
//   }
// };