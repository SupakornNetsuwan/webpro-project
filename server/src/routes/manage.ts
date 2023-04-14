import express, { Response, Request } from "express";
import prisma from "../lib/connection/prisma"
import readJWTMiddleware from "../lib/middlewares/jwt/readJWTMiddleware";
const upload = require('../lib/middlewares/multerMiddleware');
const router = express.Router()

// ควรย้ายไปอยู่ที่ /api/posts และเป็น POST Method แทนเพราะมันคือเรื่องของโพสต์ เราก็รวมไว้ที่ route เดียว
router.post('/create-post', upload.single('imgSrc'), readJWTMiddleware, async (req: Request, res: Response) => {
    //add new post
    const title = req.body.title
    const subject = req.body.subject
    const intro = req.body.intro
    const file = req.file
    // const user = req.headers.authen
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

/*
อันนี้เราเอาไปเก็บไว้ที่ /api/posts/follow/:id และเป็น POST Method
แทนจะเข้าใจได้ง่ายกว่าเพราะ อ๋อ เราติดตามโพสต์นะ ไม่ใช่ติดตาม manage เพราะตอนนี้ชื่อไฟล์เป็น manage และ มี /follow/:id
*/
router.post('/follow/:id', async (req: Request, res: Response) => {
    //insert post_id and email to follow_post table when click follow button
    const postId = req.params.id

})

export default router;