import express from 'express';
import multer from 'multer';
import fs from 'node:fs';
import { validateToken } from '../controllers/mainController.js';

const upload = multer({ dest: 'uploads/' });
export const routerMainPage = express.Router();

routerMainPage.get('/main', validateToken);

routerMainPage.get('/projects', async (req, res) => {
  res.render('projects');
});




routerMainPage.post('/projects', upload.single('file'), (req, res) => {
  const { projectName, email1, email2, ciclo } = req.body;
  if (email2 === '') {
    console.log(projectName, email1, ciclo);
  }
  console.log(req.file);
  saveDoc(req.file);
  res.send('EXITO');
});

function saveDoc (file) {
  const newPath = `uploads/${file.originalname}`;
  fs.renameSync(file.path, newPath);
  return newPath;
}
