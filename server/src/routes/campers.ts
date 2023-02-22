import express from "express";
import { getCamper, getCampers } from "../controller/campers";
const router = express.Router();

// router.get("/", checkAuth, getCampers)
router.get("/", getCampers)
router.get("/:id", getCamper)

export default router;