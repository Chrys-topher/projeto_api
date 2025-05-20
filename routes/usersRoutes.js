import express from 'express';
import { getUser, createUser, updateUser, deleteUser, loginUser } from '../controllers/usersController.js';
import verificarToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/get/:id', getUser);
router.post('/create', createUser);
router.post('/login', loginUser);

// rotas protegidas
router.put('/update/:id', verificarToken, updateUser);
router.delete('/delete/:id', verificarToken, deleteUser);

export default router;
