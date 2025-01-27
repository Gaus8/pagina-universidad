import express from 'express';

import { validateToken } from '../controllers/mainController.js';


export const routerMainPage = express.Router();



routerMainPage.get('/main', validateToken);

routerMainPage.get('/projects', async (req, res) => {
  res.render('projects');
});




