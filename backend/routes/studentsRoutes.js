import express from 'express';
import { sendProject } from '../controllers/mainController.js';
import jwt from 'jsonwebtoken';
import { upload } from '../database/dropbox.js';
import User from '../esquema/userSchema.js';
import { validateToken } from '../middleware/validateToken.js';

export const routerMainPage = express.Router();

routerMainPage.get('/main', validateToken, (req, res) => {
  res.render('main', { user: req.user }); // Pasar req.user a la vista
});

routerMainPage.get('/projects', validateToken, (req, res) => {
  res.render('projects', { user: req.user });
});



routerMainPage.get('/projects', async (req, res) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const data = jwt.verify(token, process.env.JWT_TOKEN); // Obtener userId del token

    if (!data || !data.id) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Buscar usuario y obtener sus proyectos
    const user = await User.findOne({ _id: data.id }).populate('projects');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user.projects); // Enviar solo los proyectos
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener proyectos' });
  }
});

routerMainPage.post('/projects', upload.single('file'), sendProject);
