import { Router } from 'express';
const router = Router();

const users = [];
router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const nuevoUsuario = req.body;
  users.push(nuevoUsuario);
  res.send('Mascota creada correctamente');
});

export default router;
