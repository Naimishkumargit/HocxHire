import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  experience: String,
  keySkills: [String],
  location: String,
  workAuthorization: String,
  expectedRate: String,
  availability: String,
  email: String,
  phone: String,
  linkedin: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link back to submitting user
  createdAt: { type: Date, default: Date.now },
});

const Professional = mongoose.models.Professional || mongoose.model("Professional", professionalSchema);
export default Professional;