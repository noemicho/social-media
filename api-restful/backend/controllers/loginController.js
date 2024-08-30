import User from '../models/User.js';

const loginController = {
    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            // Verifica se o usuário existe
            const user = await User.findOne({ username });

            if (!user) {
                // Se o usuário não existir, retorna um erro
                return res.status(401).json({ msg: 'Usuário não encontrado' });
            }

            // Verifica se a senha está correta
            if (user.password !== password) {
                // Se a senha estiver incorreta, retorna um erro
                return res.status(401).json({ msg: 'Senha incorreta' });
            }

            // Login bem-sucedido
            res.status(200).json({ msg: 'Login realizado com sucesso', userId: user._id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao realizar login' });
        }
    }
};

export default loginController;
