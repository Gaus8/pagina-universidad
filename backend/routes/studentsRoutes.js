import express from 'express';
import multer from 'multer';
import fs from 'node:fs';
import { validateToken, sendProject } from '../controllers/mainController.js';

const upload = multer({ dest: 'uploads/' });
export const routerMainPage = express.Router();

routerMainPage.get('/main', validateToken);

routerMainPage.get('/projects', async (req, res) => {
  res.render('projects');
});


routerMainPage.post('/projects' ,upload.single('file'), sendProject);
