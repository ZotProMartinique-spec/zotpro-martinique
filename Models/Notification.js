import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    type: {
      type: String,
      enum: [
        "follow",
        "like",
        "comment",
        "message",
        "event",
        "review"
      ],
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Notification",
  notificationSchema
);
