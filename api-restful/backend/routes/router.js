import express from 'express';
const router = express.Router();

// Rotas do User
import userRouter from './users.js'

router.use("/", userRouter)

export default router