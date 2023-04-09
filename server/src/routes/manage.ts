import express, { Response, Request } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
const upload = require('../multer_config');

const router = express.Router()

router.post('/create-post', upload.single('imgSrc'), async (req, res) => {
    //add new post
    const title = req.body.title
    const subject = req.body.subject
    const intro = req.body.intro
    const file = req.file
    const post_data = {
        post_title: title,
        intro: intro,
        subject_id: subject,
        email: null,
        img_location: file? file.path.substr(6): null,
    }
    const addPost = await prisma.post.create({
        data: post_data
    })
    res.json(addPost)
})

router.post('/follow', async (req: Request, res: Response) => {
    //insert post_id and email to follow_post table when click follow button
})

export default router;