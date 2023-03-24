import express, { Response, Request } from "express";
/* sub routes */
import user from "./user"
import protect from "./protect"

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the API" })
})

router.use("/user", user)
router.use("/protect", protect)

export default router;