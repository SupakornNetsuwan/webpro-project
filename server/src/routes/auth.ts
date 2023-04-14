import express, { Response, Request } from "express";
import readJWTMiddleware from "../lib/middlewares/jwt/readJWTMiddleware";

// Auth controller
import { logout, login } from "../controller/authController"

/**
 * @description จัดการเกี่ยวกับ Auth
 */

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Oh, login is working now 🟢" })
})

router.post("/logout", readJWTMiddleware, logout)
router.post("/login", login)

export default router;