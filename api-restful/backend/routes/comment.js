import express from 'express';
import commentController from '../controllers/commentController.js';

const router = express.Router();

// Criar um novo comentário
router.post('/post/:postId/comment', commentController.create);

// Obter todos os comentários de um post
router.get('/post/:postId/comments', commentController.getAll);

// Excluir um comentário
router.delete('/comment/:commentId', commentController.delete);

export default router;
