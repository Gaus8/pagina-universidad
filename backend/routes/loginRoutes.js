import express from 'express';
import { loginUser } from '../controllers/loginController.js';
export const routerLogin = express.Router();

routerLogin.get('', (req, res) => {
  res.render('login');
});

routerLogin.post('', loginUser);
