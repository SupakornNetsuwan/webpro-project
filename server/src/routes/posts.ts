import express, { Response, Request } from "express";
import prisma from "../lib/connection/prisma"
import readJWTMiddleware from "../lib/middlewares/jwt/readJWTMiddleware";
const upload = require('../lib/middlewares/multerMiddleware');
const router = express.Router()

/**
 * @description ทำการดึง post ทั้งหมดที่มีอยู่
 */
router.post('/', async (req: Request, res: Response) => {
    //req - filter วิชา , search โพสต์ได้
    const subject = req.body.selectedSubject
    const subjectPost = await prisma.post.findMany({
        where: { subject_id: subject }
    })
    res.json(subjectPost)
})

/**
 * @description ทำการดึง post เฉพาะที่ต้องการ ด้วย id ของโพสต์
 */
router.get('/:id', async (req: Request, res: Response) => {
    const postId = req.params.id
    //select post ที่มี id เท่านี้
    const post = await prisma.post.findUnique({
        where: { post_id: postId }
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

//ตรงนี้คิดว่าแอบแปลกๆนิดนึง เพราะใช้แค่ lessonId ก็เลือก lesson มาแสดงได้แล้ว ไม่ต้องใช้ postId
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

/**
 * @description ส่งข้อมูลจาก front-end มาสร้างโพสต์ใหม่
 */
router.post('/create-post', upload.single('imgSrc'), readJWTMiddleware, async (req: Request, res: Response) => {
    //add new post
    const title = req.body.title
    const subject = req.body.subject
    const intro = req.body.intro
    const file = req.file
    const userDetails = res.locals.userDetails
    const { email } = userDetails

    const addPost = await prisma.post.create({
        data: {
            post_title: title,
            intro: intro,
            subject_id: subject,
            author_email: email,
            img_location: file ? file.path.substr(6) : null,
        }
    })

    res.status(200).send({ message: "Post added" })
})

/**
 * @description ทำการ select post เฉพาะที่ user ติดตามเอาไว้
 */
router.get('/following', readJWTMiddleware, async (req: Request, res: Response) => {
    //select post เฉพาะที่ user ติดตามเอาไว้
    const userDetails = res.locals.userDetails
    const { email } = userDetails

    //ต้องมีการ join กับตารางโพสต์ด้วย ลืมทำตรงนี้
    const followPost = await prisma.followPost.findMany({
        where: {
            email: email
        }
    })

    res.json(followPost)
})

/**
 * @description เก็บข้อมูลเมื่อ user กดปุ่ม follow โดยมี post id จาก params id
 */
router.post('/follow/:id', readJWTMiddleware, async (req: Request, res: Response) => {
    //insert post_id and email to follow_post table when click follow button
    const postId = req.params.id
    const userDetails = res.locals.userDetails
    const { email } = userDetails

    //สร้างข้อมูลการติดตามโพสใหม่
    const newFollow = await prisma.followPost.create({
        data: {
            postId: postId,
            email: email
        }
    })

    res.status(200).send({ message: "ติดตามโพสต์เรียบร้อย" })
})

export default router;