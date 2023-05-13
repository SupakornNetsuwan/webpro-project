import express from "express";
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";
import upload from "../lib/middlewares/multerPDFMiddleware";

// Lesson controller
import { getAllLessonsFromPost, getLesson, getMyLessonsAmount, createLesson, deleteLesson, editLesson , getLearningDocument} from "../controller/lessonController"

/**
 * @description เกี่ยกับการจัดการของ Lesson
 */

const router = express.Router()

router.get("/mylessons-amount", checkJWTMiddleware, getMyLessonsAmount)

router.get('/:postId', checkJWTMiddleware, getAllLessonsFromPost)

router.get("/:lessonId/learning-document", checkJWTMiddleware, getLearningDocument)

// จัดการเนื้อหา lesson แบบ 1 by 1

router.post('/:postId', checkJWTMiddleware, upload.single('learningDocument'), createLesson)

router.get('/:postId/:lessonId', checkJWTMiddleware, getLesson)

router.put('/:postId/:lessonId', checkJWTMiddleware, upload.single('learningDocument'), editLesson)

router.delete('/:postId/:lessonId', checkJWTMiddleware, deleteLesson)

export default router;