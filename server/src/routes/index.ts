import express, { Response, Request } from "express";
/* sub routes */
import auth from "./auth"
import protect from "./protect"
import posts from './posts'
import subjects from "./subjects"
import lessons from "./lessons"

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the API" })
})

router.use("/auth", auth)
router.use("/protect", protect)
router.use('/posts', posts)
router.use('/lessons', lessons)
router.use('/subjects', subjects)

export default router;