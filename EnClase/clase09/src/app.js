//Importarciones
import express from 'express';
const app = express();
const PORT = 8080;

//Recuerden que como necesito recibir datos en JSON puedo usar esta linea de codigo:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ESCUCHANDO PUERTOS
app.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));
