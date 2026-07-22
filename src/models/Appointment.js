import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    doctorName: { type: String, required: true },
    patientName: { type: String, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    phone: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
