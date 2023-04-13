import express, { Response, Request } from "express";
import prisma from "../lib/connection/prisma"
import readJWTMiddleware from "../lib/middlewares/jwt/readJWTMiddleware";
const upload = require('../lib/middlewares/multerMiddleware');
const router = express.Router()

router.post('/create-post', upload.single('imgSrc'), readJWTMiddleware, async (req: Request, res: Response) => {
    //add new post
    const title = req.body.title
    const subject = req.body.subject
    const intro = req.body.intro
    const file = req.file
    // const user = req.headers.authen
    const userDetails = res.locals.userDetails
    const { email } = userDetails
    const post_data = {
        post_title: title,
        intro: intro,
        subject_id: subject,
        email: email,
        img_location: file ? file.path.substr(6) : null,
    }
    const addPost = await prisma.post.create({
        data: post_data
    })
    res.status(200).send({ message: "Post added" })
})

router.post('/follow/:id', async (req: Request, res: Response) => {
    //insert post_id and email to follow_post table when click follow button
    const postId = req.params.id

})

export default router;