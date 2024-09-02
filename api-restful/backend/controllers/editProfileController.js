import User from '../models/User.js';

const editProfileController = {
    edit: async (req, res) => {
        const { userId, name, username, email, password } = req.body;

        try {
            // Busca o usuário pelo ID fornecido na requisição
            const user = await User.findById(userId);

            if (!user) {
                // Se o usuário não existir, retorna um erro
                return res.status(404).json({ msg: 'User not found...' });
            }

            // Atualiza os campos somente se eles forem fornecidos
            if (name) user.name = name;
            if (username) user.username = username;
            if (email) user.email = email;
            if (password) user.password = password;

            // Salva o usuário atualizado
            await user.save();

            res.status(200).json({ msg: 'Edited your profile successfully', userId: user._id, username: user.username });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Failed to edit your profile...' });
        }
    }
};

export default editProfileController;
