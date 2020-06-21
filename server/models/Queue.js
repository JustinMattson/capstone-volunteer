import mongoose from "mongoose";
import Profile from "./Profile";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Queue = new Schema(
  {
    jobId: { type: ObjectId, ref: "Job", required: true },
    volunteerId: {
      type: ObjectId,
      ref: "Profile",
      required: true,
      unique: true, // should be able to prevent one person from applying multiple times on the front end. this didn't fully prevent.
    },
    // startDate: { type: Date },
    // endDate: { type: Date },
    creatorEmail: { type: String, required: true },
    volunteerPic: { type: String, required: true },
    volunteerName: { type: String, required: true },
    volunteerRating: { type: Number },
    volunteerEmail: { type: String, required: true },
    jobApproval: {
      type: String,
      required: true,
      default: "pending",
      enum: ["accepted", "rejected", "pending"],
    },

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
