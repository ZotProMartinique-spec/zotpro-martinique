import Notification from "../models/Notification.js";

/* GET MY NOTIFICATIONS */
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .populate("sender", "name avatar")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* MARK AS READ */
export const markAsRead = async (req, res) => {
  try {
    const notification =
      await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        error: "Notification introuvable",
      });
    }

    notification.read = true;

    await notification.save();

    res.json(notification);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* DELETE */
export const deleteNotification = async (
  req,
  res
) => {
  try {
    await Notification.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
