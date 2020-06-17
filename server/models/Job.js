import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Job = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    generalLocation: { type: String, required: true },
    estimatedHours: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    requestorId: { type: String, required: true },
    voluteerId: { type: String },
    creatorEmail: { type: String, required: true },
    jobStatus: { type: String, enum: ["pending", "completed", "cancelled"], required: true, default: "pending" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Job.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default Job;
