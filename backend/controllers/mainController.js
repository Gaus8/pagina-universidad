import { validateProject, validateProjectPartial } from '../esquema/validateProject.js';
import { uploadFile } from '../database/dropbox.js';
import Projects from '../esquema/projectSchema.js';
import dayjs from 'dayjs';
import { date } from 'zod';


export const sendProject = async (req, res) => {
  const { email2 } = req.body;
  if (email2 === '') {
    await validateOneEmail(req, res);
  } else {
    await validateDoubleEmail(req, res);
  }
};

const validateOneEmail = async (req, res) => {
  const { projectName, email1, ciclo } = req.body;
  const validar = validateProjectPartial({ projectName, email1, ciclo });
  if (validar.error) {
    return res.status(400).json({
      status: 'error',
      error: JSON.parse(validar.error.message)
    });
  }

  const projectExists = await validateNewProject(validar.data);
  if (projectExists) {
    return res.status(400).json({ message: 'Este email ya registro un proyecto' });
  }

  const url = await uploadFile(`/ciclo${ciclo}/${req.file.originalname}`, req);
  if (url.error) {
    return res.status(400).json({ message: 'Este documento ya ha sido guardado' });
  }
  const newProject = {
    projectName: validar.data.projectName.toUpperCase(),
    email1: validar.data.email1,
    url,
    ciclo
  };

  const registerProject = await saveProject(newProject);
  if (!registerProject) {
    return res.status(400).json({ message: 'Este documento ya ha sido guardado' });
  }
  return res.status(201).json({ message: 'Proyecto Guardado con Exito' });
};


const validateDoubleEmail = async (req, res) => {
  const { projectName, email1, email2, ciclo } = req.body;
  const validar = validateProject({ projectName, email1, email2, ciclo });
  if (validar.error) {
    return res.status(400).json({
      status: 'error',
      error: JSON.parse(validar.error.message)
    });
  }

  if (validar.data.email1 === validar.data.email2) {
    return res.status(400).json({ message: 'Los correos no pueden ser los mismos' });
  }

  const projectExists = await validateNewProject(validar.data);
  if (projectExists) {
    return res.status(400).json({ message: 'Los correos ya registraron un proyecto' });
  }

  const url = await uploadFile(`/ciclo${ciclo}/${req.file.originalname}`, req);
  if (!url) {
    return res.status(400).json({ message: 'Este documento ya ha sido guardado' });
  }
  const newProject = {
    projectName: validar.data.projectName.toUpperCase(),
    email1: validar.data.email1,
    email2: validar.data.email2,
    url,
    ciclo
  };

  const registerProject = await saveProject(newProject);
  if (!registerProject) {
    return res.status(400).json({ message: 'Este documento ya ha sido guardado' });
  }
  return res.status(201).json({ message: 'Proyecto Guardado con Exito' });
};


async function saveProject (project) {
  try {
    const createProject = await Projects.create(project);
    if (createProject) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

async function validateNewProject (project) {
  const findProject = await Projects.findOne({ email1: project.email1 });
  if (findProject) {
    return true; // Ya existe el proyecto
  }
  return false; // No existe el proyecto
}

export const getProject = async (req, res) => {
  try {
    const email = req.user.email; // Obtener el email del usuario desde la cookie
    if (!email) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const projects = await Projects.findOne({
      $or: [{ email1: email }, { email2: email }]
    });

    let date = null; // Declarar date fuera del if

    if (projects && projects.fecha) {
      dayjs.locale('es'); // Establecer el idioma español
      date = dayjs(projects.fecha).format('DD MMM YYYY hh:mm A'); // Formatear fecha
    }

    res.render('grades', { user: req.user, userProject: projects, date });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener proyectos' });
  }
};