import express from 'express';
const app = express();
const PORT = 8080;

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

//Express - Handlebars
app.engine('handlebars', exphbs({ engine }));
app.set('view engine', 'handlebars');
app.set('views', './src/views');


//Rutas
app.get('/', (req, res) => { 
    res.send();
});


//Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});