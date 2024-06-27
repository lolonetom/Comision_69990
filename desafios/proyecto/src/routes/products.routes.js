import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';


const router = Router();
const products = new ProductManager('./src/data/products.json');

//RUTAS

router.get('/', (req, res) => {
  res.json(products);
});
router.get('/:pid', (req, res) => {
  const pid = parseInt(req.params.id);
  const product = products.find((product) => product.id === pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

router.post('/', (req, res) => {
  const { title, description, code, price } = req.body;
  if (!title || !description || !code || !price) {
    res.status(400).send('Faltan datos');
    return;
  }
  const newProduct = {
    title,
    description,
    code,
    price,
  };
  products.push(newProduct);
  res.send('Producto creado correctamente');
});

router.delete('/:pid', (req, res) => {
  const pid = parseInt(req.params.id);
  const product = products.find((product) => product.id === pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});
//EXPORTAMOS LAS RUTAS
export default router;
