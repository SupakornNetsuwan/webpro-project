import express, { Response, Request } from "express";
import prisma from "../lib/connection/prisma"

const router = express.Router()

router.get('/',async (req: Request, res: Response) => {
    //select post to show, latest, recommend
    res.json({"message": "hi"})
})

export default router;