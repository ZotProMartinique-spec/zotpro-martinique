import Favorite from "../models/Favorite.js";

export const addFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.create({
      user: req.user.id,
      itemId: req.body.itemId,
      itemType: req.body.itemType,
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user.id,
    });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
