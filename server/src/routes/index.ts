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
router.use('/home', home) // home อันนี้คือเอาไว้ทำอะไรนะะ
router.use('/post', post) // ควรเป็นคำพหุนาม /posts เพราะว่าเรามองว่า post มันเป็นเรื่องของโพสต์ในระบบ แต่เราก็ไม่ได้มองว่ามันเป็นเรื่องของโพสต์ๆ ไหนเจาะจงเหมือน /user ที่เป็นการเข้าถึง user เพียง 1 เดียว
router.use('/summaries', summaries)
router.use('/', manage) //อันนี้อาจจะดูไม่ค่อน make sense ที่การยิงมาที่ /api แล้วเข้าไปที่ manage เพราะปกติ /api ไม่ควรเป็น API endpoint ที่ valid ในการทำงาน

export default router;