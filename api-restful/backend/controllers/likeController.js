import Post from '../models/Post.js';

const likeController = {
    like: async (req, res) => {
        const { postId, userId } = req.body;

        try {
            // Busca o post pelo ID
            const post = await Post.findById(postId);
    
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
    
            // Verifica se o usuário já curtiu o post
            const index = post.like.indexOf(userId);
    
            if (index === -1) {
                // Se o usuário não curtiu, adiciona o ID do usuário
                post.like.push(userId);
            } else {
                // Se o usuário já curtiu, remove o ID do usuário (descurtir)
                post.like.splice(index, 1);
            }
    
            // Salva as alterações no banco de dados
            await post.save();
    
            res.json({ likesCount: post.like.length }); // Retorna a contagem de curtidas atualizada
        } catch (error) {
            console.error('Error liking post:', error);
            res.status(500).json({ message: 'Error liking post' });
        }
    }
};

export default likeController;
