import Message from "../models/Message.js";

/* SEND MESSAGE */
export const sendMessage = async (req, res) => {
  try {
    const message = await Message.create({
      sender: req.user.id,
      receiver: req.body.receiver,
      text: req.body.text,
      image: req.body.image,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* GET CONVERSATION (2 USERS) */
export const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name avatar")
      .populate("receiver", "name avatar");

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* GET MY INBOX */
export const getInbox = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id },
        { receiver: req.user.id },
      ],
    })
      .sort({ createdAt: -1 })
      .populate("sender", "name avatar")
      .populate("receiver", "name avatar");

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* MARK AS READ */
export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        error: "Message introuvable",
      });
    }

    message.read = true;
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
