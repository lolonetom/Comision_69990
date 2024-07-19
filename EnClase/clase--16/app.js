import mongoose from 'mongoose';
import UserModel from './src/models/usuario.model.js';

const main = async () => {
    mongoose.connect('?')

    const respuesta = await UserModel.find().explain("executionStats");
    console.log(respuesta);
}

main();