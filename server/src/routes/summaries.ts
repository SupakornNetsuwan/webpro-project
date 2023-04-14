import express, { Response, Request } from "express";

import prisma from "../lib/connection/prisma"

const router = express.Router()

// TODO : อันนี้มันเป็นเรื่องของโพสต์ เราไม่ได้มองที่มันเป็นของหน้าไหน แต่เรามองที่การทำงาน ซึ่งมันควรไปอยู่ที่ /api/posts
router.get('/', async (req: Request, res: Response) => {
    //select all post
    const allpost = await prisma.post.findMany()
    res.json(allpost)
})

// TODO : อันนี้มันควรจะต้องถูกนำออกไปเพราะไม่จำเป็นก็ได้เราใช้ GET และ query string ไปเลยที่ /api/posts?subject=database ไปเลยง่ายกว่า
router.post('/', async (req: Request, res: Response) => {
    //req - filter วิชา , search โพสต์ได้
    const subject = req.body.selectedSubject
    const subjectPost = await prisma.post.findMany({
        where: { subject_id: subject }
    })
    res.json(subjectPost)
})

// TODO : อันนี้มันเป้นเรื่องของโพสต์ เพราะมันคือโพสต์ที่เรากำลังติดตาม เราควรออกแบบไว้ที่ /api/posts/following แทน
router.get('/following', async (req: Request, res: Response) => {
    //select post เฉพาะที่ user ติดตามเอาไว้
    const followPost = await prisma.followPost.findMany({
        where: {
            email: "email"
        }
    })
    res.json(followPost)
})

// เท่ากับว่าเราก็ไม่จำเป็นต้องมี /summaries และ /posts แยกแบบตอนนี้ เราก็จะสามารถ Reuse การทำงานได้ในอนาคตด้วย
export default router;