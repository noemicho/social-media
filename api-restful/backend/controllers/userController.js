import User from '../models/User.js'

const userController = {
    create: async (request, response) => {
        try{
            const user = {
                name: request.body.name,
                email: request.body.email,
                username: request.body.username,
                password: request.body.password
            }

            const res = await User.create(user)

            response.status(201).json({res, msg: 'Usuário criado com sucesso'})

        }catch (error){
            console.log(error)
            response.status(500).json({ msg: 'Erro ao criar o usuario.' });
        }
    },
    getAll: async (request, response) => {
        try{
            const userAll = await User.find()

            response.json(userAll)

        }catch (error){
            console.log(error)
            response.status(500).json({ msg: 'Erro pegar os usuarios.' });
        }
    },
    get: async (request, response) => {
        try{
            const id = request.params.id
            const user = await User.findById(id)
            response.json(user)

            if(!user){
                response.status(404).json({msg: 'Não foi encontrado o usuário com esse Id'})
                return
            }

        }catch (error){
            console.log(error)
            response.status(500).json({ msg: 'Erro ao pegar o usuario.' });
        }
    },
    delete: async (request, response) => {
        try{
            const id = request.params.id
            const user = await User.findById(id)
            response.json(user)

            if(!user){
                response.status(404).json({msg: 'Não foi encontrado o usuário com esse Id'})
                return
            }

            const deletedUser = await User.findByIdAndDelete(id)

            response.status(200).json({deletedUser, msg: 'Usuário excluído com sucesso'})

        }catch (error){
            console.log(error)
            response.status(500).json({ msg: 'Erro ao deletar o usuario.' });
        }
    },
    update: async (request, response) => {
        try{
            const id = request.params.id
            const userUpdates = request.body; // Pega apenas os campos que vieram na requisição

            const updatedUser = await User.findByIdAndUpdate(id, userUpdates, { new: true });

            if(!updatedUser){
                response.status(404).json({msg: 'Não foi encontrado o usuário com esse Id'})
                return
            }

            response.status(200).json({updatedUser, msg: 'Usuário atualizado com sucesso'})

            
        }catch (error){
            console.log(error)
            response.status(500).json({ msg: 'Erro ao atualizar o usuario.' });
        }
    },
    getUsernamesByIds: async (request, response) => {
        try {
            const { userIds } = request.body; // Recebe a lista de IDs no corpo da requisição
            const users = await User.find({ _id: { $in: userIds } }).select('username');
            const usernames = users.map(user => user.username);
            response.status(200).json({ usernames });
        } catch (error) {
            console.log(error);
            response.status(500).json({ msg: 'Erro ao buscar usernames.' });
        }
    }
}

export default userController