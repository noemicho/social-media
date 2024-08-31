import express from 'express'
import cors from 'cors'

// DB conexão
import conn from './db/config_db.js'

const app = express()

// Ajuste o limite de tamanho para 10MB, por exemplo
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.use(cors())
app.use(express.json())

conn()

// Rotas
import routes from './routes/router.js'

app.use('/api', routes)


app.listen(3002, function(){
    console.log('Escutando a porta 3002 do backend!')
})


