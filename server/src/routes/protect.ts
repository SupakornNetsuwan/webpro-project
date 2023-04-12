import express, { Request, Response, NextFunction } from "express";
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware"

const router = express.Router()

router.get("/", checkJWTMiddleware, (req: Request, res: Response, next: NextFunction,) => {

    // ข้อมูลของผู้ใช้งาน
    const userDetails = res.locals.userDetails

    console.log(userDetails)

    res.json({
        message: "protected route 🌷"
    })
})

export default router;