const express = require('express');
const router = express.Router();
const {
  getBootCamp,
  updateBootCamp,
  DeleteBootCamp,
  createBootCamp,
  getBootCamps,
} = require('../controllers/bootcamp');

router.route('/').get(getBootCamps).post(createBootCamp);

router
  .route('/:id')
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(DeleteBootCamp);

module.exports = router;
