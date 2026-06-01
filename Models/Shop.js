import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", ShopSchema);

export default Shop;
