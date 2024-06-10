// Levantamos un servidor
import express from 'express';
const app = express();
const PORT = 8080;
import petsRouter from './routes/pets.router.js';
import userRouter from './routes/users.router.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
/* app.get('/', (req, res) => {
  res.send('App de mascotas');
}); */

app.use('/api/pets', petsRouter);
app.use('/api/users', userRouter);

//Dejamos escuchando el servidor:
app.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`);
});

//Carpetas publicas
/* app.use(express.static('./src/public')); */

// si queremos que la carpeta public se llame de otra forma podemos usar un prefijo viruta
app.use('/static', express.static('./src/public'));

//Middleware de terceros; Multer
import multer from 'multer';

//Configuramos Multer:
//Configuramos un Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/img');
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//Crear una ruta que me permita cargar un archivo
app.post('/upload', upload.single('imagen'), (req, res) => {
  //Nececsito que sea POST porque tengo que cargar un recurso al servidor
  res.send('Upload!');
});
