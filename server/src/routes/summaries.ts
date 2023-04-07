import express, { Response, Request } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

const router = express.Router()

router.get('/',async (req: Request, res: Response) => {
    //select all post
    const allpost = await prisma.post.findMany()
    res.json(allpost)
})

router.post('/',async (req: Request, res: Response) => {
    //req - filter วิชา , search โพสต์ได้
    const subject = req.body.selectedSubject
    const subjectPost = await prisma.post.findMany({
        where: { subject_id: subject }
    })
    res.json(subjectPost)
})

router.get('/following',async (req: Request, res: Response) => {
    //select post เฉพาะที่ติดตามเอาไว้
    const followPost = await prisma.follow_post.findMany({
        where: {
            email: "email"
        }
    })
    res.json(followPost)
})

export default router;