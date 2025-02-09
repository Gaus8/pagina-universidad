import express from 'express';
import { validateToken } from '../middleware/validateToken.js';
import { renderRoutes } from '../controllers/renderRoutes.js';
import { changePassword, forgotPassword } from '../controllers/passwordController.js';

export const routerPassword = express.Router();

routerPassword.get('/change_password', validateToken, renderRoutes('password'));
routerPassword.patch('/change_password', validateToken, changePassword);

routerPassword.get('/recover_password', (req, res) => {
  res.render('recover');
});

routerPassword.post('/recover_password', forgotPassword);