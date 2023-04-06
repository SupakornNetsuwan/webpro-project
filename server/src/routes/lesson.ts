import express, { Response, Request } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

const router = express.Router()

router.get('/post/:postId:lessonId', async (req: Request, res: Response) => {
    const postId = req.params.postId
    const lessonId = req.params.lessonId
    
    const lesson = prisma.lesson.findUnique({
        where: {
            lesson_id: lessonId
        }
    })
    res.json(lesson)
})

export default router;