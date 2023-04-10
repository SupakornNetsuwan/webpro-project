import express, { Response, Request } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

const router = express.Router()

router.get('/:id', async (req: Request, res: Response) => {
    const postId = req.params.id
    //select post ที่มี id เท่านี้
    const post = await prisma.post.findUnique({
        where: {post_id: postId }
    })
    const postLesson = await prisma.lesson.findMany({
        where: { post_id: postId }
    })
    res.json([post, postLesson])
})

router.get('/:id/:lessonId', async (req: Request, res: Response) => {
    const postId = req.params.id
    const lessonId = req.params.lessonId

    const lesson = prisma.lesson.findUnique({
        where: {
            lesson_id: lessonId,
        }
    })
    res.json(lesson)
})

export default router;