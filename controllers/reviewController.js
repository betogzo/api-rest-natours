const catchAsync = require('./../utils/catchAsync');
const Review = require('../models/reviewModel');

exports.createReview = catchAsync(async (req, res, next) => {
  //allowing nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.author = req.user.id;
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newReview
    }
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  /* if there is a tourId param, then find all the reviews on that tour
  and if there's no tourId, filter will be empty and find method will 
  find all reviews regardless of their tour */
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});