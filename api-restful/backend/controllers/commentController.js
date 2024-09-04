import Post from '../models/Post.js';
import User from '../models/User.js';

const commentController = {
    create: async (req, res) => {
        const { postId } = req.params;
        const { userId, text } = req.body;

        try {
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ msg: 'Post não encontrado.' });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado.' });
            }

            // Adiciona o novo comentário
            const comment = {
                user: user._id,
                text: text,
            };

            post.comments.push(comment);
            await post.save();

            res.status(201).json({ msg: 'Comentário adicionado com sucesso!', comment });
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
            res.status(500).json({ msg: 'Erro ao adicionar comentário.' });
        }
    },

    getAll: async (req, res) => {
        const { postId } = req.params;

        try {
            const post = await Post.findById(postId).populate('comments.user', 'username');
            if (!post) {
                return res.status(404).json({ msg: 'Post não encontrado.' });
            }

            res.status(200).json(post.comments);
        } catch (error) {
            console.error('Erro ao obter comentários:', error);
            res.status(500).json({ msg: 'Erro ao obter comentários.' });
        }
    },

    delete: async (req, res) => {
        const { commentId } = req.params;

        try {
            const post = await Post.findOne({ 'comments._id': commentId });
            if (!post) {
                return res.status(404).json({ msg: 'Comentário não encontrado.' });
            }

            // Remove o comentário do post
            post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
            await post.save();

            res.status(200).json({ msg: 'Comentário deletado com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar comentário:', error);
            res.status(500).json({ msg: 'Erro ao deletar comentário.' });
        }
    }
};

export default commentController;
