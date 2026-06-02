import Review from "../models/Review.js";

/* CREATE REVIEW */
export const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      user: req.user.id,
      shop: req.body.shop,
      product: req.body.product,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* GET REVIEWS */
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name avatar")
      .populate("shop", "name")
      .populate("product", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* DELETE REVIEW */
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        error: "Avis introuvable",
      });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        error: "Accès refusé",
      });
    }

    await review.deleteOne();

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
