import express from 'express';
import jwt from 'jsonwebtoken';
import { Drop } from '../database/dropbox.js';
import path from 'path';
import fs from 'fs';

export const routerMainPage = express.Router();

const drop = new Drop();

routerMainPage.get('/main', async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send('ACCESS NO AUTHORIZED');
  }
  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN);
    res.render('main', { data });
  } catch (error) {
    console.log(error);
  }
});

routerMainPage.get('/projects', async (req, res) => {
  res.render('projects');
});


routerMainPage.get('/:id', async (req, res) => {
  const fileId = req.params.id; // El ID del archivo desde el cliente
  const dropboxPath = `/${fileId}`; // Ruta en Dropbox (debes ajustar esto según tu estructura)
  const localPath = path.resolve(`./temp/${fileId}`); // Ruta local temporal

  try {
    // Descargar el archivo desde Dropbox a la ruta local
    await drop.descargar(dropboxPath, localPath);

    // Enviar el archivo descargado al cliente
    res.download(localPath, fileId, (err) => {
      if (err) {
        console.error('Error al enviar el archivo al cliente:', err);
        res.status(500).send('Error al descargar el archivo.');
      }

      // Eliminar el archivo local después de enviarlo
      fs.unlinkSync(localPath);
    });
  } catch (error) {
    console.error('Error en la descarga del archivo:', error);
    res.status(500).send('No se pudo descargar el archivo.');
  }
});



