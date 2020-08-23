const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootCamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

// @desc      Get a single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`));
    // res.status(400).json({
    //   success: false,
    //   data: error,
    // });
  }
};

// @desc      Create a bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.createBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ success: true, data: bootcamp });
  }
};

// @desc      Update a single bootcamps
// @route     GET /api/v1/bootcamps:id
// @access    Public
exports.updateBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

// @desc      Delete a single bootcamps
// @route     GET /api/v1/bootcamps:id
// @access    Public
exports.DeleteBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    bootcamp.remove();
    res
      .status(200)
      .json({ success: true, count: bootcamp.length, data: bootcamps });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false });
  }
};
