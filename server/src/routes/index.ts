import express, { Response, Request } from "express";
/* sub routes */
import auth from "./auth"
import protect from "./protect"
import home from './home'
import posts from './posts'

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the API" })
})

router.use("/user", auth)
router.use("/protect", protect)
router.use('/home', home) // home อันนี้คือเอาไว้ทำอะไรนะะ >> ตอนแรกแยกเป็นหน้านึง 1 ไฟล์ อันนี้เลยเอาไว้สำหรับหน้า home เพราะมันต้องเลือก post ล่าสุดกับแนะนำมาขึ้น ตอนนี้คิดว่าลบดีกว่าเพราะมันเกี่ยวกับ post เอาไว้หน้า post ละกัน
router.use('/posts', posts) // ควรเป็นคำพหุนาม /posts เพราะว่าเรามองว่า post มันเป็นเรื่องของโพสต์ในระบบ แต่เราก็ไม่ได้มองว่ามันเป็นเรื่องของโพสต์ๆ ไหนเจาะจงเหมือน /user ที่เป็นการเข้าถึง user เพียง 1 เดียว

export default router;