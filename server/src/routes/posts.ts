import express, { Response, Request, NextFunction } from "express";
import prisma from "../lib/connection/prisma"
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";
import upload from "../lib/middlewares/multerMiddleware";

// From controllers
import { createPost, getPosts, getPost, deletePost, followPost , getFollowingPost , getMyPosts , getMyPostsAmount, editPost} from "../controller/postController";

/**
 * @desciption จัดการเกี่ยวกับ Post
 */

const router = express.Router()

router.post('/', checkJWTMiddleware, upload.single('thumbnail'), createPost)

router.get('/', checkJWTMiddleware, getPosts)

router.get("/myposts", checkJWTMiddleware, getMyPosts)

router.get("/myposts-amount", checkJWTMiddleware, getMyPostsAmount)

router.get('/following', checkJWTMiddleware, getFollowingPost)

router.post('/follow/:postId', checkJWTMiddleware, followPost)

router.put('/edit-post/:postId', checkJWTMiddleware, upload.single('thumbnail'), editPost)

// ลำดับของ route สำคัญเพราะมันอาจจะไปเข้า /:postId ได้

router.get('/:postId', checkJWTMiddleware, getPost)

router.delete('/:postId', checkJWTMiddleware, deletePost)


export default router;