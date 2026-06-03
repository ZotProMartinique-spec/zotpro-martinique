import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Shop", shopSchema);
