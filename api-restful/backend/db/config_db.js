import mongoose from 'mongoose';

//mongodb+srv://admin:otQaCsGxyJkPwN5d@cluster0.yllwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//otQaCsGxyJkPwN5d
//admin


async function main(){
    try{
        await mongoose.connect('mongodb+srv://admin:otQaCsGxyJkPwN5d@cluster0.yllwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    }
    catch(error){
        console.log(`Erro: ${error}`)
    }
}

export default main;