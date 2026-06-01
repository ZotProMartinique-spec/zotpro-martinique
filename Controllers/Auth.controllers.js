import User from "../models/User.js";

/* FOLLOW / UNFOLLOW */
export const toggleFollow = async (req, res) => {
  try {
    const targetId = req.params.id;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const target = await User.findById(targetId);

    if (!target) return res.status(404).json({ error: "User not found" });

    const isFollowing = user.following.includes(targetId);

    if (isFollowing) {
      user.following = user.following.filter(
        (id) => id.toString() !== targetId
      );
      target.followers = target.followers.filter(
        (id) => id.toString() !== userId
      );
    } else {
      user.following.push(targetId);
      target.followers.push(userId);
    }

    await user.save();
    await target.save();

    res.json({ message: "updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
