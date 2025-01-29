import jwt from 'jsonwebtoken';
import { validateProject, validateProjectPartial } from '../esquema/validateProject.js';
import { uploadFile } from '../database/dropbox.js';
import Projects from '../esquema/projectSchema.js'

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

    uploadFile(`/ciclo${ciclo}/${req.file.originalname}`, req);
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




  res.send('EXITO');
};


