const express = require("express");
const router = express.Router();

const {
  getReviews,
  createReview,
  updateReviewStatus,
} = require("../controllers/reviewController");

router.get("/", getReviews);
router.post("/", createReview);
router.put("/:id", updateReviewStatus);

module.exports = router;