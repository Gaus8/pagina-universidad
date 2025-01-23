import express from 'express';
import { registerUser } from '../controllers/registerController.js';

export const routerRegister = express.Router();

routerRegister.get('/register', (req, res) => {
  res.render('register');
});

routerRegister.post('/register', registerUser);

