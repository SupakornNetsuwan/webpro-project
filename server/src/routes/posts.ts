import express, { Response, Request } from "express";
import prisma from "../lib/connection/prisma"
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";
import upload from "../lib/middlewares/multerMiddleware";

// From controllers
import { createPost, getPosts, getPost, deletePost, followPost , getFollowingPost} from "../controller/postController";

/**
 * @desciption จัดการเกี่ยวกับ Post
 */

const router = express.Router()

router.post('/', checkJWTMiddleware, upload.single('thumbnail'), createPost)

router.get('/', checkJWTMiddleware, getPosts)

router.get('/:postId', checkJWTMiddleware, getPost)

router.delete('/:postId', checkJWTMiddleware, deletePost)

// เกี่ยวกับการติดตาม

router.get('/following', checkJWTMiddleware, getFollowingPost)

router.post('/follow/:postId', checkJWTMiddleware, followPost)

export default router;