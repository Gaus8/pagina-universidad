import express from 'express';
import { sendProject } from '../controllers/mainController.js';
import { renderRoutes } from '../controllers/renderRoutes.js';
import { upload } from '../database/dropbox.js';
import { validateToken } from '../middleware/validateToken.js';

export const routerMainPage = express.Router();

routerMainPage.get('/main', validateToken, async (req, res) => {
  res.render('main', { user: req.user });
});

routerMainPage.get('/projects', validateToken, renderRoutes('projects'));


routerMainPage.post('/projects', upload.single('file'), sendProject);


routerMainPage.get('/grades', validateToken, renderRoutes('grades'));


