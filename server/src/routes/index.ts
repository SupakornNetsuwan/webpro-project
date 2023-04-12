import express, { Response, Request } from "express";
/* sub routes */
import user from "./user"
import protect from "./protect"
import home from './home'
import summaries from './summaries'
import post from './post'
import manage from './manage'

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the API" })
})

router.use("/user", user)
router.use("/protect", protect)
router.use('/home', home)
router.use('/post', post)
router.use('/summaries', summaries)
router.use('/', manage)

export default router;