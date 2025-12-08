import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  summary: String,
  company: String,
  category: String,
  type: String,
  experience: String,
  email: String,
  skills: [String],
  budget: Number,
  location: String,
  featured: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  draft: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;
