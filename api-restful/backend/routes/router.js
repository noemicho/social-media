import express from 'express';
const router = express.Router();

// Rotas do User
import userRouter from './users.js'
import postRouter from './posts.js'

router.use("/", userRouter)
router.use("/", postRouter)

export default router