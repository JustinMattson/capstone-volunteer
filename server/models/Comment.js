import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    body: { type: String, required: true },
    jobId: { type: String, required: true },
    profileId: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Comment.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default Comment;
