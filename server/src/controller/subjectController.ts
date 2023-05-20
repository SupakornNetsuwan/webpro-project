import { Response, Request, NextFunction } from "express";
import { Prisma } from "@prisma/client"
import prisma from "../lib/connection/prisma"
import getErrorMessage from "../lib/functions/getErrorMessage";
/**
 * @route /api/subjects
 * @method GET
 * @description ทำการดึงข้อมูล subjects ทั้งหมด
 */

export const getSubjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjects = await prisma.subject.findMany()
        res.send(subjects)

    } catch (err) {
        res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/subjects
 * @method POST
 * @description ทำการสร้าง Subject ใหม่
 * @payload
 * ```
 * {
 *  subject_name : "string",
 *  description : "string",
 *  instructor_name : "string"
 * }
 * ```
 */

export const createSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subject_name, description, instructor_name } = req.body
        const { role } = res.locals.userDetails;
        console.log(req.body)

        if(role != "ADMIN"){
            return res.status(403).send("คุณไม่มีสิทธิ์ในการเพิ่มวิชา")
        }

        if (!subject_name || !description || !instructor_name) return res.status(400).send({ message: "โปรดกรอกข้อมูลให้ครบถ้วน" })
        if (subject_name.lenght > 10) return res.status(400).send("ชื่อวิชายาวเกิน 10 ตัวอักษร")

        const subject = await prisma.subject.create({
            data: {
                subject_name,
                description,
                instructor_name
            }
        })
        res.send(subject)
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2002":
                    return res.status(400).send("มีวิชานี้อยู่แล้ว")
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}