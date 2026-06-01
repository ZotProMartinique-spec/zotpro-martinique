import User from "../models/User.js";

/* ================= GET PROFILE ================= */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "name avatar")
      .populate("following", "name avatar");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= FOLLOW / UNFOLLOW ================= */
export const toggleFollow = async (req, res) => {
  try {
    const targetId = req.params.id;
    const currentUserId = req.user.id;

    if (targetId === currentUserId) {
      return res.status(400).json({ error: "Cannot follow yourself" });
    }

    const user = await User.findById(currentUserId);
    const target = await User.findById(targetId);

    if (!user || !target) {
      return res.status(404).json({ error: "User not found" });
    }

    const isFollowing = user.following.includes(targetId);

    if (isFollowing) {
      user.following = user.following.filter(
        (id) => id.toString() !== targetId
      );
      target.followers = target.followers.filter(
        (id) => id.toString() !== currentUserId
      );
    } else {
      user.following.push(targetId);
      target.followers.push(currentUserId);
    }

    await user.save();
    await target.save();

    res.json({
      following: !isFollowing,
      followersCount: target.followers.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= ME ================= */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= SUGGESTIONS ================= */
export const getSuggestions = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);

    const users = await User.find({
      _id: { $ne: req.user.id, $nin: me.following },
    })
      .select("name avatar bio")
      .limit(10);

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
