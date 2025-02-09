import express from 'express';
import { sendProject, updateProject } from '../controllers/mainController.js';
import { upload } from '../database/dropbox.js';
import { validateToken } from '../middleware/validateToken.js';
import { renderRoutes } from '../controllers/renderRoutes.js';
export const routerMainPage = express.Router();

routerMainPage.get('/main', validateToken,renderRoutes('main'));

routerMainPage.get('/projects', validateToken, renderRoutes('projects'));


routerMainPage.post('/projects', upload, sendProject);
routerMainPage.patch('/projects', upload, updateProject);

routerMainPage.get('/grades', validateToken, renderRoutes('grades'));
routerMainPage.get('/change_password', validateToken, renderRoutes('password'));

