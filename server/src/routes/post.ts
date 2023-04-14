import express, { Response, Request } from "express";
import prisma from "../lib/connection/prisma"

const router = express.Router()

// TODO : GET "/api/post" ดึงโพสต์ทั้งหมด

/**
 * @description ทำการดึง post เฉพาะที่ต้องการ ด้วย id ของโพสต์
 */
router.get('/:id', async (req: Request, res: Response) => {
    const postId = req.params.id
    //select post ที่มี id เท่านี้
    const post = await prisma.post.findUnique({
        where: {post_id: postId }
    })
    //select lesson ที่เป็นของ post นี้
    const postLesson = await prisma.lesson.findMany({
        where: { post_id: postId }
    })
    res.json([post, postLesson])
})

/**
 * @description ทำการดึง lesson เฉพาะที่ต้องการ ด้วย id ของ lesson และ id ของโพสต์
 */
router.get('/:id/:lessonId', async (req: Request, res: Response) => {
    const postId = req.params.id
    const lessonId = req.params.lessonId

    //select lesson ที่ต้องการเปิด
    const lesson = prisma.lesson.findUnique({
        where: {
            lesson_id: lessonId,
        }
    })
    res.json(lesson)
})

export default router;