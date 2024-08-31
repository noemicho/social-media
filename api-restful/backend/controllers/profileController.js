import User from '../models/User.js';
import Post from '../models/Post.js';

const profileController = {
    getProfile: async (req, res) => {
        const { userId } = req.body;

        try {
            // Verifica se o usuário existe
            const user = await User.findById(userId);

            if (!user) {
                // Se o usuário não existir, retorna um erro
                return res.status(404).json({ msg: 'User not found!' });
            }

            // Pega todos os posts do usuário
            const posts = await Post.find({ user: userId });

            res.status(200).json({ user, posts });

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Failed to get info from this user...' });
        }
    }
};

export default profileController;