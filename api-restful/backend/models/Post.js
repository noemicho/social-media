import mongoose from 'mongoose'

import User from './User.js'

const postSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId, // Referência ao ID do usuário
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
            ref: 'User'
        },
        text: {
            type: String, // Texto do comentário
            required: true
        }
    }]
})

const Post = mongoose.model("Post", postSchema)

export default Post