import express from 'express'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())
app.listen(3002, function(){
    console.log('Escutando a porta 3002 do backend!')
})