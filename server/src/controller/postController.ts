import express, { Response, Request } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../lib/connection/prisma"
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";
import upload from "../lib/middlewares/multerMiddleware";
import getErrorMessage from "../lib/functions/getErrorMessage";

/**
 * @route /api/posts
 * @method POST
 * @description ส่งข้อมูลจาก Client มาสร้างโพสต์ใหม่
 * @payload
 * ```
 * {
 *  title: string,
 *  intro: string,
 *  subjectName: string,
 *  thumbnail: file
 * }
 * ```
 */

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, intro, subjectName } = req.body
        const { email: authorEmail } = res.locals.userDetails

        if (!title || !intro || !authorEmail || !subjectName) {
            // ตรวจสอบว่าครบมั้ย
            return res.status(400).send("โปรดกรอกข้อมูให้ครบถ้วน")
        }

        // file เป็น optional ดังนั้นต้องมีการตรวจสอบว่ามีไฟล์ไหม
        const { filename, path } = req.file || {}

        const createdPost = await prisma.post.create({
            data: {
                post_title: title,
                intro: intro,
                subject_name: subjectName,
                author_email: authorEmail,
                post_img: process.env.SERVER_PUBLIC_URL + "/" + filename
            }
        })

        res.status(200).send(createdPost)
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2003":
                    return res.status(400).send("ไม่พบวิชาที่ต้องการ")
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/posts
 * @method GET
 * @description ทำการดึง post ทั้งหมดที่มีอยู่
 */

export const getPosts = async (req: Request, res: Response) => {
    try {
        const subjectPost = await prisma.post.findMany()
        res.json(subjectPost)
    } catch (err) {
        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/posts/:postId
 * @method GET
 * @description ทำการดึง post เฉพาะที่ต้องการ ด้วย id ของโพสต์
 */

export const getPost = async (req: Request, res: Response) => {
    try {

        const postId = req.params.postId
        //select post ที่มี id เท่านี้
        const searchedPost = await prisma.post.findUnique({
            where: { post_id: postId },
            include: {
                lessons: true
            }
        })

        if (!searchedPost) return res.status(400).send("ไม่พบโพสต์ที่ต้องการ")

        res.json(searchedPost)
    } catch (err) {
        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/posts/:postId
 * @method DELETE
 * @description ทำการดึง post เฉพาะที่ต้องการ ด้วย id ของโพสต์
 */

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params
        if (!postId) return res.status(400).send("โปรดระบุ id ของโพสต์ที่ต้องการลบ")
        await prisma.post.delete({
            where: {
                post_id: postId
            }
        })

        res.send("ลบโพสต์สำเร็จ")

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2025":
                    return res.status(400).send("ไม่พบโพสต์ที่ต้องการลบ")
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}


/**
 * @route /api/posts/following
 * @method GET
 * @description ทำการดึง post เฉพาะที่ผู้ใช้ติดตามเอาไว้
 */

export const getFollowingPost = async (req: Request, res: Response) => {
    //select post เฉพาะที่ user ติดตามเอาไว้
    const userDetails = res.locals.userDetails
    const { email } = userDetails

    //ต้องมีการ join กับตารางโพสต์ด้วย ลืมทำตรงนี้
    const followPost = await prisma.followPost.findMany({
        where: {
            email: email
        }
    })

    res.send(followPost)
}

/**
 * @route /api/posts/follow/:postId
 * @param postId รหัสของโพสต์ที่ต้องการติดตาม
 * @method POST
 * @description ผู้ใช้ทำการกดติดตามโพสต์ใหม่
 */

export const followPost = async (req: Request, res: Response) => {
    //insert post_id and email to follow_post table when click follow button
    const postId = req.params.postId
    const { email } = res.locals.userDetails

    //สร้างข้อมูลการติดตามโพสใหม่
    const newFollow = await prisma.followPost.create({
        data: {
            post_id: postId,
            email: email
        }
    })

    res.status(200).send({ message: "ติดตามโพสต์เรียบร้อย" })
}