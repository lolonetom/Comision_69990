import mongoose from 'mongoose';
import OrderModel from './models/order.model.js';
import express from 'express';
import exphbs from 'express-handlebars';

const app = express();
const PORT = 8080;

//DB Connection
mongoose.connect(
    'mongodb+srv://coder:Coder69990@coderhouse.ojkrenb.mongodb.net/Pizzalandia?retryWrites=true&w=majority&appName=coderhouse');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', '.src/views');

app.get('/pizzas', async (req, res) => {
  const page = req.query.page || 1;
  const limit = 2;
  try {
    const pizzasListado = await OrderModel.paginate({}, { page, limit });

    res.render('pizzas', {
      pizzas: pizzasListado.docs,
      hasPrevPage: pizzasListado.hasPrevPage,
      hasNextPage: pizzasListado.hasNextPage,
      prevPage: pizzasListado.prevPage,
      nextPage: pizzasListado.nextPage,
      currentPage: pizzasListado.page,
      totalPages: pizzasListado.totalPages,
    });
  } catch (error) {
    console.log('Error al pedir pizzas');
    res.status(500).send('Error en el servidor, nos vamos a congelar');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor express corriendo en http://localhost:${PORT}`);
}); 

/* const main = async () => {
  mongoose.connect(
    'mongodb+srv://coder:Coder69990@coderhouse.ojkrenb.mongodb.net/Pizzalandia?retryWrites=true&w=majority&appName=coderhouse'
  );

  const resultado = await OrderModel.aggregate([
    {
      $match: {
        tam: 'familiar',
      },
    },
    {
      $group: {
        _id: '$nombre',
        total: {
          $sum: '$cantidad',
        },
      },
    },
    //EJERCICIO 2
    {
      $sort: {
        total: -1, //<---- 1: ascendente -1: descendente
      },
    },
    //Guardamos los resultados en "reports"
    {
      $group: {
        _id: 10,
        orders: {
          $push: '$$ROOT',
          //Si yo quiero que los resultados se guarden en un array puedo usar $push
          //ROOT hace referencia al documento actual.
        },
      },
    },
    //Una vez que agrupamos los resultados, los guardamos en una colección:
    {
      $project: {
        _id: 0,
        orders: '$orders',
        //Acá le decimos que el campo "orders" va a ser igual a los resultados que guardamos en el paso anterior.
      },
    },
    //Ultimo pasito, super importante: el merge
    {
      $merge: {
        into: 'reports',
      },
    },
  ]);

  console.log(resultado);
};

main();
 */