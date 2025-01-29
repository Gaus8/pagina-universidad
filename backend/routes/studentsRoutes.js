import express from 'express';
import { validateToken, sendProject } from '../controllers/mainController.js';
import { upload } from '../database/dropbox.js';
export const routerMainPage = express.Router();

routerMainPage.get('/main', validateToken('main'));

routerMainPage.get('/projects', validateToken('projects'));


routerMainPage.post('/projects', upload.single('file'), sendProject);
