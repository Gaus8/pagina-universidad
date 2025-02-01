import express from 'express';
import { sendProject, getProject } from '../controllers/mainController.js';
import { upload } from '../database/dropbox.js';
import { validateToken } from '../middleware/validateToken.js';

export const routerMainPage = express.Router();

routerMainPage.get('/main', validateToken, (req, res) => {
  res.render('main', { user: req.user });
});

routerMainPage.get('/projects', validateToken, async (req, res) => {
  res.render('projects', { user: req.user });
});

routerMainPage.post('/projects', upload.single('file'), sendProject);


routerMainPage.get('/grades', validateToken, getProject );


