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
        }
    },
    getAll: async (request, response) => {
        try{
            const userAll = await User.find()

            response.json(userAll)

        }catch (error){
            console.log(error)
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
        }
    }
}

export default userController