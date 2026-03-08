import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Professional" }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;