const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({ success: true, data: bootcamps });
});

// @desc      Get a single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Create a bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.createBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc      Update a single bootcamps
// @route     GET /api/v1/bootcamps:id
// @access    Public
exports.updateBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Delete a single bootcamps
// @route     GET /api/v1/bootcamps:id
// @access    Public
exports.DeleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return res.status(400).json({ success: false });
    bootcamp.remove();
    res
      .status(200)
      .json({ success: true, count: bootcamp.length, data: bootcamps });
  }
});
