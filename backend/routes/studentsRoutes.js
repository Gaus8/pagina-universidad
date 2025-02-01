import express from 'express';
import { sendProject } from '../controllers/mainController.js';
import jwt from 'jsonwebtoken';
import { upload } from '../database/dropbox.js';
import Projects from '../esquema/projectSchema.js';
import { validateToken } from '../middleware/validateToken.js';

export const routerMainPage = express.Router();

routerMainPage.get('/main', validateToken, (req, res) => {
  res.render('main', { user: req.user });
});

routerMainPage.get('/projects', validateToken, async (req, res) => {
  res.render('projects', { user: req.user });
});

routerMainPage.post('/projects', upload.single('file'), sendProject);


routerMainPage.get('/grades', validateToken, async (req, res) => {
  try {
    const email = req.user.email; // Obtener el id del usuario desde la cookie
    if (!email) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    const projects = await Projects.findOne({
      $or: [
        { email1: email },
        { email2: email }
      ]
    });
    res.render('grades', { user: req.user, userProject: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener proyectos' });
  }
});


