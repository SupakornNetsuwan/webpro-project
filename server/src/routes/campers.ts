import express from "express";
import { getCamper, getCampers } from "../controller/campers";
import { checkAuth } from "../controller/authen";
const router = express.Router();

router.get("/", checkAuth, getCampers)
router.get("/:id", getCamper)

export default router;