import mongoose from 'mongoose'

import User from './User.js'

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Deve ser ObjectId para referência a User
        ref: 'User',
        required: true
    },
    image: {
        type: String, // URL da imagem ou caminho para o armazenamento
        required: true
    },
    description: {
        type: String, // Descrição do post
        required: true
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId, // Referência ao ID do usuário que curtiu
        ref: 'User'
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId, // Referência ao ID do usuário que comentou
            ref: 'User',
            required: true
        },
        username: {
            type: String, // Novo campo para armazenar o username
            required: true
        },
        text: {
            type: String, // Texto do comentário
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now // Define a data e hora atual como padrão
    }
})

const Post = mongoose.model("Post", postSchema)

export default Post