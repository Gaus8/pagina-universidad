import express from 'express';
import { validateToken } from '../middleware/validateToken.js';
import { renderRoutes } from '../controllers/renderRoutes.js';
import { changePassword, sendEmailPassword, resetPassword } from '../controllers/passwordController.js';

export const routerPassword = express.Router();

routerPassword.get('/change_password', validateToken, renderRoutes('password'));
routerPassword.patch('/change_password', validateToken, changePassword);

routerPassword.get('/recover_password', (req, res) => {
  res.render('recover_password');
});

routerPassword.post('/recover_password', sendEmailPassword);

routerPassword.get('/reset_password', (req, res) => {
  res.render('reset_password');
});

routerPassword.patch('/reset_password', resetPassword);
