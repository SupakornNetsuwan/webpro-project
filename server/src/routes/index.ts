import express, { Response, Request } from "express";
/* sub routes */
import campers from "./campers"
import camps from "./camps"

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the API" })
})

router.use('/campers', campers)
router.use('/camps', camps)


export default router;