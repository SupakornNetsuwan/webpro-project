import express, { Response, Request } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../lib/connection/prisma"
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";
import upload from "../lib/middlewares/multerMiddleware";
import getErrorMessage from "../lib/functions/getErrorMessage";
import path from "path";

/**
 * @route /api/lessons/:postId
 * @param postId รหัสของ post ที่ต้องการดึงข้อมูล lessons
 * @method GET
 * @description ทำการดึงข้อมูล lessons ทั้งหมดที่อยู่ภายใต้ post นั้นๆ
 */

export const getAllLessonsFromPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId

        const allLessons = await prisma.lesson.findMany({
            where: { post_id: postId }
        })

        res.json(allLessons)
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}


export const getMyLessonsAmount = async (req: Request, res: Response) => {

    try {
        const { email, role } = res.locals.userDetails

        if (role === "ADMIN") {
            const allLessonsAmount = await prisma.lesson.count({});
            return res.send(allLessonsAmount.toString())
        }

        const myLessonsAmount = await prisma.lesson.count({
            where: {
                post: {
                    author_email: email,
                },
            },
        });

        res.send(myLessonsAmount.toString())

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/posts/:postId/:lessonId
 * @param postId รหัสของ post ที่เป็นเจ้าของ lesson
 * @param lessonId รหัสของ lesson ที่ต้องการ
 * @method GET
 * @description ทำการดึงข้อมูล lesson ที่ต้องการโดย lessonId
 */

export const getLesson = async (req: Request, res: Response) => {
    try {
        const lessonId = req.params.lessonId

        const lesson = await prisma.lesson.findUnique({
            where: { lesson_id: lessonId }
        })

        if (!lesson) return res.status(400).send("ไม่พบบทเรียนที่ต้องการ")

        res.json(lesson)

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/lessons/:postId
 * @param postId รหัสของ post ที่ต้องการสร้าง lesson ภายใต้
 * @method POST
 * @description ทำการสร้าง lesson ใหม่เพิ่มเข้าไปภายใต้โพสต์นั้นๆ
 * @payload
 * ```
 * {
 *  title: string,
 *  intro: string,
 *  content: string,
 *  file : File
 * }
 * ```
 */
export const createLesson = async (req: Request, res: Response) => {

    const { postId } = req.params
    const { role, email } = res.locals.userDetails;

    const { title, intro, content } = req.body

    if (!title || !intro || !content) return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน")
    if (content.length > 1000000) return res.status(400).send("ภาพใน content มีขนาดใหญ่เกินไป")
    if (title.length < 5) return res.status(400).send("หัวข้อบทเรียนต้องมีความยาวอย่างน้อย 5 ตัวอักษร")

    // file เป็น optional ดังนั้นต้องมีการตรวจสอบว่ามีไฟล์ไหม
    const { filename, path } = req.file || {}

    console.log(filename, path)

    try {
        const newLesson = await prisma.lesson.create({
            data: {
                lesson_title: title,
                lesson_content: content,
                lesson_intro: intro,
                post_id: postId,
                ...(filename && { file_location: process.env.SERVER_PUBLIC_URL + "/" + filename }),
            }
        })

        res.send(newLesson)

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                default:
                    console.log(err)
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/lessons/:postId/:lessonId
 * @param postId รหัสของ post ที่ต้องการแก้ข lesson
 * @param lessonId รหัสของ lesson ที่จะถูกแก้ไข
 * @method PUT
 * @description ทำการแก้ไข lesson
 * @payload
 * ```
 * {
 *  title: string,
 *  intro: string,
 *  content: string,
 *  file : File
 * }
 * ```
 */

export const editLesson = async (req: Request, res: Response) => {
    const { lessonId, postId } = req.params;
    const { title, intro, content } = req.body
    const { email: userEmail, role } = res.locals.userDetails

    if (role != "ADMIN") {
        //ตรวจสอบว่าเป็นเจ้าของโพสต์มั้ย โดยเช็คจากข้อมูลผู้เขียนของโพสต์นั้น ยกเว้นแอดมิน
        const postAuthor = await prisma.post.findUnique({
            where: {
                post_id: postId,
            },
            select: {
                author_email: true
            }
        })

        if (userEmail != postAuthor?.author_email) {
            return res.status(403).send("คุณไม่ใช่เจ้าของโพสต์")
        }
    }

    if (!title || !intro || !content) return res.status(400).send("กรุณากรอกข้อมูลให้ครบถ้วน")
    if (content.length > 1000000) return res.status(400).send("ภาพใน content มีขนาดใหญ่เกินไป")
    if (title.length < 5) return res.status(400).send("หัวข้อบทเรียนต้องมีความยาวอย่างน้อย 5 ตัวอักษร")

    // file เป็น optional ดังนั้นต้องมีการตรวจสอบว่ามีไฟล์ไหม
    const { filename, path } = req.file || {}

    console.log(filename || "ไม่มีไฟล์")

    try {
        const newLesson = await prisma.lesson.update({
            where: { lesson_id: lessonId },
            data: {
                lesson_title: title,
                lesson_content: content,
                lesson_intro: intro,
                post_id: postId,
                ...(filename && { file_location: process.env.SERVER_PUBLIC_URL + "/" + filename }),
            }
        })

        res.send(newLesson)

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                default:
                    console.log(err)
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/lessons/:postId/:lessonId
 * @param postId รหัสของ post ของ lesson
 * @param lessonId รหัสของ lesson ต้องการลบ
 * @method DELETE
 * @description ทำการลบ lesson
 */

export const deleteLesson = async (req: Request, res: Response) => {

    const { userDetails: { email, role } } = res.locals
    const { lessonId, postId } = req.params

    // ดึงข้อมูลอีเมลเข้าของของโพสต์ที่มีบทเรียนนี้อยู่ว่าตรงกันมั้ย
    const postOfLesson = await prisma.lesson.findFirst({
        where: {
            lesson_id: lessonId,
        },
        select: {
            post: {
                select: {
                    author_email: true
                }
            }
        }
    })


    if (role === "ADMIN" || postOfLesson?.post.author_email === email) {
        try {
            await prisma.lesson.delete({where: { lesson_id: lessonId }})

            return res.send("ลบบทเรียนสำร็จ")
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                switch (err.code) {
                    default:
                        console.log(err)
                        return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
                }
            }

            return res.status(500).send(getErrorMessage(err))
        }
    }

    return res.status(403).send("คุณไม่มีสิทธิ์ในการลบบทเรียนนี้")

}

/**
 * @route /api/lessons/:lessonId/learning-document
 * @param lessonId รหัสของบทเรียนที่ต้องการโหลดเอกสาร
 * @method GET
 * @description ทำการดาวน์โหลดเอกสาร learning document
 * */

export const getLearningDocument = async (req: Request, res: Response) => {

    try {
    const {lessonId} = req.params

    const lesson = await prisma.lesson.findUnique({
        where: {
            lesson_id: lessonId
        }
    })

    if (!lesson) {
        return res.status(404).send("ไม่พบบทเรียนที่ต้องการโหลดเอกสาร")
    }

    if (!lesson?.file_location){
        return res.status(400).send("บทเรียนนี้ไม่มีเอกสาร")
    }

    const downloadPath = "../server/src/public" + lesson?.file_location?.substr(21)

    return res.download(downloadPath)

    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }

}