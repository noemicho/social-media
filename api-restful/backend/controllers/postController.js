import Post from '../models/Post.js'

const postController = {
    create: async (request, response) => {
        try{
            const post = {
                username: request.body.username,
                image: request.body.image,
                description: request.body.description,
                like: request.body.like,
                comments: request.body.comments
            }

            const res = await Post.create(post)

            response.status(201).json({res, msg: 'Post criado com sucesso'})

        }catch (error){
            console.log(error)
            response.status(500).json({ msg: 'Erro ao criar o post.' })
        }
    },
    getAll: async (request, response) => {
        try{
            // Obtém todos os posts e popula o campo 'username' com os dados do usuário correspondente
            const postAll = await Post.find().populate('username');
            response.status(200).json(postAll);

        }catch (error){
            console.log(error)
            response.status(500).json({ msg: 'Erro ao obter os posts.' });
        }
    },
    get: async (request, response) => {
        try{
            const postId = request.params.id;

            // Obtém o post pelo ID e popula o campo 'username' com os dados do usuário correspondente
            const post = await Post.findById(postId).populate('username');

            if (!post) {
                return response.status(404).json({ msg: 'Post não encontrado.' });
            }

            response.status(200).json(post);

        }catch (error){
            console.log(error)
            response.status(500).json({ msg: 'Erro ao obter o post.' });
        }
    },
    delete: async (request, response) => {
        try{
            const postId = request.params.id;

            // Deleta o post pelo ID
            const deletedPost = await Post.findByIdAndDelete(postId);

            if (!deletedPost) {
                return response.status(404).json({ msg: 'Post não encontrado.' });
            }

            response.status(200).json({ msg: 'Post deletado com sucesso.' });

        }catch (error){
            console.log(error)
            response.status(500).json({ msg: 'Erro ao deletar o post.' });
        }
    },
    update: async (request, response) => {
        try{
            const postId = request.params.id;
            const postUpdates = request.body;

            // Atualiza o post pelo ID com os campos fornecidos
            const updatedPost = await Post.findByIdAndUpdate(postId, postUpdates, { new: true }).populate('username');

            if (!updatedPost) {
                return response.status(404).json({ msg: 'Post não encontrado.' });
            }

            response.status(200).json({ post: updatedPost, msg: 'Post atualizado com sucesso!' });
            
        }catch (error){
            console.log(error)
            response.status(500).json({ msg: 'Erro ao atualizar o post.' });
        }
    }
}

export default postController