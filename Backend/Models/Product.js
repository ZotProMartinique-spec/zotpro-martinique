import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
