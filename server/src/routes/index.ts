import express, { Response, Request } from "express";
/* sub routes */
import login from "./login"
import protect from "./protect"
import home from './home'
import summaries from './summaries';
import post from './post'

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the API" })
})

router.use("/login", login)
router.use("/protect", protect)
router.use('/home', home)
router.use('/post', post)
router.use('/summaries', summaries)


export default router;