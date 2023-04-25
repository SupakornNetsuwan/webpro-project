import express from "express";
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";

// Lesson controller
import { getAllLessonsFromPost, getLesson, getMyLessonsAmount, createLesson } from "../controller/lessonController"

/**
 * @description เกี่ยกับการจัดการของ Lesson
 */

const router = express.Router()

router.get("/mylessons-amount", checkJWTMiddleware, getMyLessonsAmount)

router.get('/:postId', checkJWTMiddleware, getAllLessonsFromPost)

router.post('/:postId', checkJWTMiddleware, createLesson)

router.get('/:postId/:lessonId', checkJWTMiddleware, getLesson)

export default router;