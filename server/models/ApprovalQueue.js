import mongoose from "mongoose";
import Profile from "./Profile";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const ApprovalQueue = new Schema(
  {
    jobId: { type: ObjectId, ref: "Job", required: true },
    voluteerId: { type: ObjectId, ref: "Profile" },
    // startDate: { type: Date },
    // endDate: { type: Date },
    jobApproval: { type: String, enum: ["accepted", "rejected", "pending"] },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

ApprovalQueue.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default ApprovalQueue;
