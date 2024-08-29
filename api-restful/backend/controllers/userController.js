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
    }
}

export default userController