import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    image: { type: String, required: true },
    experience: { type: String, required: true },
    availability: [{ type: String }],
    description: { type: String, required: true },
    hospital: { type: String, required: true },
    location: { type: String, required: true },
    fee: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
