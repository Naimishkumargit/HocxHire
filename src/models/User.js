import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;