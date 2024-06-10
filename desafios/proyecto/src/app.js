//SECCION DE IMPORTACIONES
import express from 'express';

////////////////////////////////
const app = express();
const PORT = 8080;

//PARA USO DE DATOS EN JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS
app.use('api/products', productsRouter);
app.use('api/carts', cartsRouter);

//ESCUCHANDO PUERTOS
app.listen(PORT, () => console.log(`Estoy escuchando el puerto ${PORT}`));
