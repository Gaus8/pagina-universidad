import express from 'express';
import { registerUser } from '../controllers/registerController.js';

export const routerRegister = express.Router();

routerRegister.get('', (req, res) => {
  res.render('register');
});

routerRegister.post('/', registerUser);

