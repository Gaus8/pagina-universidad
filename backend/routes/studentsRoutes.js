import express from 'express';
import { validateToken, sendProject} from '../controllers/mainController.js';
import { upload } from '../database/dropbox.js';
export const routerMainPage = express.Router();

routerMainPage.get('/main', validateToken);

routerMainPage.get('/projects', async (req, res) => {
  res.render('projects');
});


routerMainPage.post('/projects', upload.single('file'), sendProject);
