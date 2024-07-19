import mongoose from "mongoose";

const schema = new mongoose.Schema({
    nombre: {
        type: String,
    },
    apellido: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    edad: {
        type: Number
    }
});

const UserModel = mongoose.model("usuarios", schema);

export default UserModel;