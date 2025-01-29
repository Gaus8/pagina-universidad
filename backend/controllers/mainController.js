import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import { validateProject, validateProjectPartial } from '../esquema/validateProject.js';


export const validateToken = async (req, res) => {
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
};


// Carpeta donde se guardarán los archivos
export const sendProject = (req, res) => {
  const { projectName, email1, email2, ciclo } = req.body;
  console.log(email2);
  if (email2 === '') {
    const validar = validateProjectPartial({ projectName, email1, ciclo });
    if (validar.error) {
      return res.status(400).json({
        status: 'error',
        error: JSON.parse(validar.error.message)
      });
    }
  }
  if (email2 !== '') {
    const validar = validateProject({ projectName, email1, email2, ciclo });
    if (validar.error) {
      return res.status(400).json({
        status: 'error',
        error: JSON.parse(validar.error.message)
      });
    }
  }




  console.log(req.file);
  // saveDoc(req.file);
  res.send('EXITO');
};

// function saveDoc (file) {
//   const newPath = `uploads/${file.originalname}`;
//   fs.renameSync(file.path, newPath);
//   return newPath;
// }
