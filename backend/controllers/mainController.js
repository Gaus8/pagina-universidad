import jwt from 'jsonwebtoken';
import { validateProject, validateProjectPartial } from '../esquema/validateProject.js';
import { uploadFile } from '../database/dropbox.js';
import Projects from '../esquema/projectSchema.js';

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

export const sendProject = async (req, res) => {
  const { email2 } = req.body;
  if (email2 === '') {
    await vadlidateOneEmail(req, res);
  } else {
    await vadlidateDoubleEmail(req, res);
  }
};


const vadlidateOneEmail = async (req, res) => {
  const { projectName, email1, ciclo } = req.body;
  const validar = validateProjectPartial({ projectName, email1, ciclo });
  if (validar.error) {
    return res.status(400).json({
      status: 'error',
      error: JSON.parse(validar.error.message)
    });
  }
  const url = await uploadFile(`/ciclo${ciclo}/${req.file.originalname}`, req);
  const newProject = {
    projectName: validar.data.projectName,
    email1: validar.data.email1,
    url,
    ciclo
  };

  saveProject(newProject);
};


const vadlidateDoubleEmail = async (req, res) => {
  const { projectName, email1, email2, ciclo } = req.body;
  const validar = validateProject({ projectName, email1, email2, ciclo });
  if (validar.error) {
    return res.status(400).json({
      status: 'error',
      error: JSON.parse(validar.error.message)
    });
  }
  const projectExists = await validateNewProject(validar.data.projectName);
  if (projectExists) {
    return res.status(400).json({ message: 'Proyecto ya registrado' });
  }

  const url = await uploadFile(`/ciclo${ciclo}/${req.file.originalname}`, req);
  const newProject = {
    projectName: validar.data.projectName.toUpperCase(),
    email1: validar.data.email1,
    email2: validar.data.email2,
    url,
    ciclo
  };

  const registerProject = await saveProject(newProject);
  res.status(201).json({ registerProject });
};


async function saveProject (project) {
  const createProject = await Projects.create(project);
  console.log(createProject);
  return 'Proyecto REgistrado con exito';
};

async function validateNewProject (project) {
  const findProject = await Projects.findOne({ projectName: project });
  if (findProject) {
    return 'Proyecto ya registrado';
  }
};
