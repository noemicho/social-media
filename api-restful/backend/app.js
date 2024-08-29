import express from 'express'
import cors from 'cors'

// DB conexão
import conn from './db/config_db.js'

const app = express()
app.use(cors())
app.use(express.json())

conn()

// Rotas
import routes from './routes/router.js'

app.use('/api', routes)


app.listen(3002, function(){
    console.log('Escutando a porta 3002 do backend!')
})


