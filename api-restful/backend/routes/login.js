import express from 'express';
import loginController from '../controllers/loginController.js';

const router = express.Router();

// Define a rota /login e usa o controlador para processar a requisição POST
//router.post('/login', loginController.login);
router.route('/login').post((request, response) =>loginController.login(request, response))

export default router;
