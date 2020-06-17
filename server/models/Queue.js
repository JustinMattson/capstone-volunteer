import mongoose from "mongoose";
import Profile from "./Profile";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Queue = new Schema(
  {
    jobId: { type: ObjectId, ref: "Job", required: true },
    voluteerId: { type: ObjectId, ref: "Profile" },
    // startDate: { type: Date },
    // endDate: { type: Date },
    creatorEmail: { type: String, required: true },
    jobApproval: { type: String, required: true, default: "pending", enum: ["accepted", "rejected", "pending"] },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Queue.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default Queue;
