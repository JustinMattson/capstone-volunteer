import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

const Job = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    generalLocation: { type: String, required: true },
    estimatedHours: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    requestorId: { type: String, required: true },
    volunteerId: [{ type: ObjectId, ref: "Profile" }],
    requesterRatings: [{ type: Object }],   //job rating {volunteerId, Rating from Volunteer to job poster}
    volunteerRatings: [{ type: Object }],    //helper's rating {volunteerId, Rating from job poster to Volunteer}
    creatorEmail: { type: String, required: true },
    jobStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      required: true,
      default: "pending",
    },
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
