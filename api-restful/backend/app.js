import express from 'express'
import cors from 'cors'
import conn from './db/config_db.js'

const app = express()
app.use(cors())
app.use(express.json())

conn()

app.listen(3002, function(){
    console.log('Escutando a porta 3002 do backend!')
})

//otQaCsGxyJkPwN5d
//admin


