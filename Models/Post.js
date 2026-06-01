const Post = mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      caption: String,
      image: String,

      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      comments: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          text: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],

      //
      score: {
        type: Number,
        default: 0,
        index: true,
      },
    },
    { timestamps: true }
  )
);

export default Post;
