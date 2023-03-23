import express, { Request, Response , NextFunction } from "express";
import checkJWT from "../lib/jwt/checkJWT"

const router = express.Router()

router.get("/", checkJWT, (req: Request, res: Response, next: NextFunction,) => {
    res.json({
        status: 200,
        message: "protected route 🌷"
    })
})

export default router;