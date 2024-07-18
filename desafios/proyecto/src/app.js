//SECCION DE IMPORTACIONES
import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/view.routes.js';
////////////////////////////////
const app = express();
const PORT = 8081;

//PARA USO DE DATOS EN JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// EXPRESS HANDLEBARS
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//RUTAS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

//ESCUCHANDO PUERTOS
app.listen(PORT, () =>
  console.log(`Servidor esta listo en la direccion http://localhost:${PORT}`)
);
