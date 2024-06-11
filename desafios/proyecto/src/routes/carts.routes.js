import { Router } from 'express';

const router = Router();
const carts = [];

//RUTAS

router.get('/', (req, res) => {
  res.json(carts);
});
router.get('/:pid', (req, res) => {
  res.json(carts);
});

router.post('/', (req, res) => {
  const newCart = req.body;
  carts.push(newCart);
  res.send('Carrito creado correctamente');
});
//EXPORTAMOS LAS RUTAS
export default router;
