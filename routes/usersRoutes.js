import express from 'express';
import { getUsers, getUserByID, createUser, updateUser, deleteUser, loginUser } from '../controllers/usersController.js';

const router = express.Router();

router.get('/getall', getUsers);

router.get('/get/:id', getUserByID);

router.post('/create', createUser);

router.put('/update/:id', updateUser);

router.delete('/delete/:id', deleteUser);

router.post('/login', loginUser);

export default router;
