import { Router } from 'express';

const router = Router();
const products = [];

//RUTAS

router.get('/', (req, res) => {
  res.json(products);
});
router.get('/:pid', (req, res) => {
  res.json(products);
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.send('Producto creado correctamente');
});
//EXPORTAMOS LAS RUTAS
export default router;
