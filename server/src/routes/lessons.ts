import express from "express";
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";
import upload from "../lib/middlewares/multerPDFMiddleware";

// Lesson controller
import { getAllLessonsFromPost, getLesson, getMyLessonsAmount, createLesson, deleteLesson } from "../controller/lessonController"

/**
 * @description เกี่ยกับการจัดการของ Lesson
 */

const router = express.Router()

router.get("/mylessons-amount", checkJWTMiddleware, getMyLessonsAmount)

router.get('/:postId', checkJWTMiddleware, getAllLessonsFromPost)

router.post('/:postId', checkJWTMiddleware, upload.single('learningDocument'), createLesson)

router.delete('/:postId', checkJWTMiddleware, deleteLesson)

router.get('/:postId/:lessonId', checkJWTMiddleware, getLesson)

export default router;