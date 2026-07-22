import { Router } from "express";
import Appointment from "../models/Appointment.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { doctorId, doctorName, patientName, gender, phone, appointmentDate, appointmentTime } =
      req.body;

    const appointment = await Appointment.create({
      userId: req.user.id,
      userEmail: req.user.email,
      doctorId,
      doctorName,
      patientName,
      gender,
      phone,
      appointmentDate,
      appointmentTime,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create appointment" });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const { patientName, gender, phone, appointmentDate, appointmentTime } = req.body;

    appointment.patientName = patientName ?? appointment.patientName;
    appointment.gender = gender ?? appointment.gender;
    appointment.phone = phone ?? appointment.phone;
    appointment.appointmentDate = appointmentDate ?? appointment.appointmentDate;
    appointment.appointmentTime = appointmentTime ?? appointment.appointmentTime;

    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete appointment" });
  }
});

export default router;
