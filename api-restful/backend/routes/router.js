import express from 'express';
const router = express.Router();

// Rotas do User
import userRouter from './users.js'
import postRouter from './posts.js'
import loginRouter from './login.js'
import registerRouter from './register.js'

router.use("/", userRouter)
router.use("/", postRouter)
router.use("/", loginRouter)
router.use("/", registerRouter)

export default router