import { Router } from "express";
import { auth } from "../auth.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.put("/profile", requireAuth, async (req, res) => {
  try {
    const { name, image } = req.body;

    const result = await auth.api.updateUser({
      headers: req.headers,
      body: {
        name,
        image,
      },
    });

    res.json(result?.user || result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
});

export default router;
