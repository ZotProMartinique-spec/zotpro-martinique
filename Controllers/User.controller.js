import User from "../models/User.js";

/* GET MY PROFILE */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "Utilisateur introuvable",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* GET USER BY ID */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "Utilisateur introuvable",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* UPDATE PROFILE */
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "Utilisateur introuvable",
      });
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* FOLLOW USER */
export const followUser = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    const target = await User.findById(req.params.id);

    if (!target) {
      return res.status(404).json({
        error: "Utilisateur introuvable",
      });
    }

    if (!me.following.includes(target._id)) {
      me.following.push(target._id);
      target.followers.push(me._id);

      await me.save();
      await target.save();
    }

    res.json({
      success: true,
      message: "Utilisateur suivi",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* UNFOLLOW USER */
export const unfollowUser = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    const target = await User.findById(req.params.id);

    me.following = me.following.filter(
      (id) => id.toString() !== target._id.toString()
    );

    target.followers = target.followers.filter(
      (id) => id.toString() !== me._id.toString()
    );

    await me.save();
    await target.save();

    res.json({
      success: true,
      message: "Utilisateur retiré",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
