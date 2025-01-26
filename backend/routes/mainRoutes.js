import express from 'express';
import User from '../esquema/userSchema.js';
export const routerMainPage = express.Router();

routerMainPage.get('/main', async (req, res) => {
 

  res.render('main');
});
