import { Router } from "express";
import Doctor from "../models/Doctor.js";
import Review from "../models/Review.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { search, sort } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    let doctorsQuery = Doctor.find(query);

    if (sort === "rating") {
      doctorsQuery = doctorsQuery.sort({ rating: -1 });
    } else if (sort === "fee-low") {
      doctorsQuery = doctorsQuery.sort({ fee: 1 });
    } else if (sort === "fee-high") {
      doctorsQuery = doctorsQuery.sort({ fee: -1 });
    } else if (sort === "name") {
      doctorsQuery = doctorsQuery.sort({ name: 1 });
    } else {
      doctorsQuery = doctorsQuery.sort({ rating: -1 });
    }

    const doctors = await doctorsQuery.lean();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
});

router.get("/top-rated", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ rating: -1 }).limit(3).lean();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top rated doctors" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).lean();
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctor" });
  }
});

router.get("/:id/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ doctorId: req.params.id })
      .sort({ createdAt: -1 })
      .lean();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

router.post("/:id/reviews", requireAuth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const review = await Review.create({
      doctorId: req.params.id,
      userId: req.user.id,
      userName: req.user.name,
      userImage: req.user.image || "",
      rating,
      comment,
    });

    const reviews = await Review.find({ doctorId: req.params.id });
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Doctor.findByIdAndUpdate(req.params.id, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to add review" });
  }
});

export default router;
