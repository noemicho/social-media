import Post from '../models/Post.js';
import User from '../models/User.js'; // Importa o modelo de User para buscar o ObjectId

const postController = {
    create: async (request, response) => {
        try {
            const usuario = await User.findById(request.body.user);
    
            if (!usuario) {
                return response.status(404).json({ msg: 'Usuário não encontrado.' });
            }
    
            // Mapeia e aguarda todas as promessas para `like`
            const likes = await Promise.all(
                request.body.like.map(async (userId) => {
                    const user = await User.findById(userId);
                    if (!user) {
                        console.warn(`Usuário com ID ${userId} não encontrado nos likes.`);
                        return null; // Retorna null se o usuário não for encontrado
                    }
                    return user._id;
                })
            ).then((results) => results.filter((id) => id !== null)); // Filtra os valores nulos
    
            // Mapeia e aguarda todas as promessas para `comments`
            const comments = await Promise.all(
                request.body.comments.map(async (comment) => {
                    const user = await User.findById(comment.user);
                    if (!user) {
                        console.warn(`Usuário com ID ${comment.user} não encontrado nos comentários.`);
                        return null;
                    }
                    return {
                        user: user._id, // Acessa o _id do usuário encontrado
                        text: comment.text,
                    };
                })
            ).then((results) => results.filter((comment) => comment !== null)); // Filtra comentários nulos
    
            const post = {
                user: usuario._id,
                image: request.body.image,
                description: request.body.description,
                like: likes,
                comments: comments,
            };
    
            const res = await Post.create(post);
            response.status(201).json({ res, msg: 'Post criado com sucesso' });
    
        } catch (error) {
            console.error('Erro ao criar o post:', error);
            response.status(500).json({ msg: 'Erro ao criar o post.' });
        }
    },
    getAll: async (request, response) => {
        try {
            // Obtém todos os posts e popula o campo 'user' com os dados do usuário correspondente
            const postAll = await Post.find().populate('user');
            response.status(200).json(postAll);
        } catch (error) {
            console.log(error);
            response.status(500).json({ msg: 'Erro ao obter os posts.' });
        }
    },
    get: async (request, response) => {
        try {
            const postId = request.params.id;

            // Obtém o post pelo ID e popula o campo 'user' com os dados do usuário correspondente
            const post = await Post.findById(postId).populate('user');

            if (!post) {
                return response.status(404).json({ msg: 'Post não encontrado.' });
            }

            response.status(200).json(post);

        } catch (error) {
            console.log(error);
            response.status(500).json({ msg: 'Erro ao obter o post.' });
        }
    },
    delete: async (request, response) => {
        try {
            const postId = request.params.id;

            // Deleta o post pelo ID
            const deletedPost = await Post.findByIdAndDelete(postId);

            if (!deletedPost) {
                return response.status(404).json({ msg: 'Post não encontrado.' });
            }

            response.status(200).json({ msg: 'Post deletado com sucesso.' });

        } catch (error) {
            console.log(error);
            response.status(500).json({ msg: 'Erro ao deletar o post.' });
        }
    },
    update: async (request, response) => {
        try {
            const postId = request.params.id;
            const postUpdates = request.body;

            // Atualiza o post pelo ID com os campos fornecidos
            const updatedPost = await Post.findByIdAndUpdate(postId, postUpdates, { new: true }).populate('user');

            if (!updatedPost) {
                return response.status(404).json({ msg: 'Post não encontrado.' });
            }

            response.status(200).json({ post: updatedPost, msg: 'Post atualizado com sucesso!' });
            
        } catch (error) {
            console.log(error);
            response.status(500).json({ msg: 'Erro ao atualizar o post.' });
        }
    },
    
    // Adiciona um comentário ao post
    addComment: async (request, response) => {
        try {
            const postId = request.params.id;
            const { user, text } = request.body;
    
            const usuario = await User.findById(user);
            if (!usuario) {
                return response.status(404).json({ msg: 'Usuário não encontrado.' });
            }
    
            // Cria o comentário
            const comment = {
                user: usuario._id,
                text,
            };
    
            // Adiciona o comentário ao post
            const post = await Post.findByIdAndUpdate(postId, { $push: { comments: comment } }, { new: true })
                .populate('comments.user'); // Popula o usuário do comentário
    
            if (!post) {
                return response.status(404).json({ msg: 'Post não encontrado.' });
            }
    
            response.status(200).json({ post, comment }); // Retorna o post atualizado e o novo comentário
    
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
            response.status(500).json({ msg: 'Erro ao adicionar comentário.' });
        }
    },
    
}

export default postController;
