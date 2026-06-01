import mongoose from "mongoose";

export default mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: String,
      price: Number,
      shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
    },
    { timestamps: true }
  )
);
