import "dotenv/config";

import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { connectDB } from "./src/config/db.js";
import { allowedOrigins } from "./src/config/cors.js";
import { auth, mongoClient } from "./src/auth.js";
import doctorsRouter from "./src/routes/doctors.js";
import appointmentsRouter from "./src/routes/appointments.js";
import usersRouter from "./src/routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();
await mongoClient.connect();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "DocAppoint API is running" });
});

app.use("/api/doctors", doctorsRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
