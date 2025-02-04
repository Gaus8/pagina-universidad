import Projects from '../schema/projectSchema.js';
import dayjs from 'dayjs';

export const renderRoutes = (ruta) => async (req, res) => {
  try {
    const email = req.user.email;
    if (!email) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const projects = await Projects.findOne({
      $or: [
        { email1: email },
        { email2: email }
      ]
    });

    let date = '';

    if (projects && projects.fecha) {
      dayjs.locale('es'); // Establecer el idioma español
      date = dayjs(projects.fecha).format('DD MMM YYYY hh:mm A');
    }

    res.render(ruta, { user: req.user, userProject: projects, date });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener proyectos' });
  }
};
