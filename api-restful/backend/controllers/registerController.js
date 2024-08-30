import User from '../models/User.js';

const registerController = {
    register: async (req, res) => {
        const { name, email, password, username } = req.body;

        try {
            // Verifica se o username ou email já estão em uso
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });

            if (existingUser) {
                // Se o usuário já existir, retorna um erro
                return res.status(400).json({ msg: 'Username ou email já em uso' });
            }

            // Cria um novo usuário
            const newUser = new User({
                name,
                email,
                username,
                password, // Senha em texto simples
            });

            // Salva o novo usuário no banco de dados
            await newUser.save();

            // Cadastro bem-sucedido
            res.status(201).json({ msg: 'Cadastro realizado com sucesso', userId: newUser._id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao realizar o cadastro' });
        }
    }
};

export default registerController;
