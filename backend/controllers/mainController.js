import { validateProjectPartial } from '../schema/validateProject.js';
import { uploadFile, deleteFileByLink } from '../database/dropbox.js';
import Projects from '../schema/projectSchema.js';

export const sendProject = async (req, res) => {
  await getProject(req, res);
};

const getProject = async (req, res) => {
  const { ciclo } = req.body;
  const validar = validateProjectPartial(req.body);

  if (validar.error) {
    return res.status(400).json({
      status: 'error',
      error: JSON.parse(validar.error.message)
    });
  }

  const { email1, email2, projectName } = validar.data;

  if (email2 !== null) {
    if (email1 === email2) {
      return res.status(400).json({ message: 'Los correos no pueden ser los mismos' });
    }
  }

  const email2Exists = email2 || null;

  const projectExists = await findProject(email1, email2Exists);
  if (projectExists) {
    return res.status(400).json({ message: 'Este email ya registro un proyecto' });
  }
  const resultFiles = await uploadPdfAndSlides(req, res, ciclo);
  const fileUrl = resultFiles.pdf;
  const slidesUrl = resultFiles.slides;


  const newProject = {
    projectName: projectName.toUpperCase(),
    email1,
    email2: email2Exists,
    fileUrl,
    slidesUrl,
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
    return false;
  }
};


async function findProject (email1, email2) {
  if (email2 !== null) {
    const query = {
      $or: [{ email1 }, { email2 }, { email1: email2 }, { email2: email1 }]
    };
    return await Projects.exists(query);
  } else {
    const query = {
      email1
    };
    return await Projects.exists(query);
  }
}

async function uploadPdfAndSlides (req, res, ciclo) {
  const file = req.files.file ? req.files.file[0] : null;
  const slides = req.files.slides ? req.files.slides[0] : null;

  const fileUrl = file ? await uploadFile(`/ciclo${ciclo}/${file.originalname}`, file) : null;
  if (fileUrl.error) {
    return res.status(400).json({ message: 'Este documentoooooo ya ha sido guardado' });
  }

  const slidesUrl = slides ? await uploadFile(`/diapositivas_ciclo${ciclo}/${slides.originalname}`, slides) : null;
  if (slides !== null && slidesUrl.error) {
    return res.status(400).json({ message: 'Este documentooooo ya ha sido guardado' });
  }
  return {
    pdf: fileUrl,
    slides: slidesUrl
  };
}

export const updateProject = async (req, res) => {
  const { ciclo } = req.body;
  const validar = validateProjectPartial(req.body);

  if (validar.error) {
    return res.status(400).json({
      status: 'error',
      error: JSON.parse(validar.error.message)
    });
  }

  const email2 = validar.data.email2 ? validar.data.email2 : null;

  const project = await Projects.findOne({
    $or: [
      { email1: validar.data.email1 },
      { email2: validar.data.email2 }
    ]
  });

  if (!project) {
    return res.status(400).json({ message: 'No se ha encontrado este proyecto' });
  }
  console.log(project.fileUrl);

  if (project.slidesUrl !== null) {
    await deleteFileByLink(project.fileUrl);
    await deleteFileByLink(project.slidesUrl);
  }

  await deleteFileByLink(project.fileUrl);

  const resultFiles = await uploadPdfAndSlides(req, res, ciclo);
  const fileUrl = resultFiles.pdf;
  const slidesUrl = resultFiles.slides;



  const updatePoject = {
    projectName: validar.data.projectName.toUpperCase(),
    email1: validar.data.email1,
    email2: validar.data.email2,
    fileUrl,
    slidesUrl,
    ciclo
  };

  try {
    if (project) {
      const update = await Projects.updateOne({
        $or: [
          { email1: validar.data.email1 },
          { email2: validar.data.email2 }
        ]
      }, { $set: updatePoject });
      if (update.modifiedCount > 0) {
        return res.status(200).json({ message: 'Proyecto actualizado con éxito' });
      } else {
        return res.status(400).json({ message: 'No se encontró el proyecto o no hubo cambios' });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const findProjectsMongo = async (req, res) => {
  try {
    const { ciclo } = req.body;
    const projects = await Projects.find({ ciclo }); // Filtrar proyectos por ciclo
    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
};
