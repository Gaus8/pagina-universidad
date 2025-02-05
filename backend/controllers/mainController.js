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
  const email2 = validar.data.email2 ? validar.data.email2 : null;

  const projectExists = await findProject(validar.data);
  if (projectExists) {
    return res.status(400).json({ message: 'Este email ya registro un proyecto' });
  }

  const resultFiles = await uploadPdfAndSlides(req, res, ciclo);
  const fileUrl = resultFiles.pdf;
  const slidesUrl = resultFiles.slides;


  const newProject = {
    projectName: validar.data.projectName.toUpperCase(),
    email1: validar.data.email1,
    email2,
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

async function findProject (project) {
  const findProject = await Projects.findOne({
    $or: [
      { email1: project.email1 },
      { email2: project.email2 }
    ]
  });

  if (findProject) {
    return true;
  }
  return false;
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



// const updateProject = async (req, res) => {
//   const { ciclo } = req.body;
//   const validar = validateProjectPartial(req.body);

//   if (validar.error) {
//     return res.status(400).json({
//       status: 'error',
//       error: JSON.parse(validar.error.message)
//     });
//   }

//   if (validar.data.email2) {
//     if (validar.data.email1 === validar.data.email2) {
//       return res.status(400).json({ message: 'Los correos no pueden ser los mismos' });
//     }
//   }
//   const project = await findProject(validar.data);
//   const resultFiles = await uploadPdfAndSlides(req, res, ciclo);

//   const fileUrl = resultFiles.pdf;
//   const slidesUrl = resultFiles.slides;

//   const updatePoject = {
//     projectName: validar.data.projectName.toUpperCase(),
//     email1: validar.data.email1,
//     email2: validar.data.email2,
//     fileUrl,
//     slidesUrl,
//     ciclo
//   };
//   try {

//     if (project) {
//       const update = Projects.updateOne({
//         $or: [
//           { email1: validar.data.email1 },
//           { email2: validardata.email2 }
//         ]
//       }, { $set: { data } });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

