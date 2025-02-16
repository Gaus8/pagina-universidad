import Projects from '../schema/projectSchema.js';

export const qualifyProject = async (req, res) => {
  const { nota, observaciones, id } = req.body;
  const filter = { _id: id };
  const update = {
    nota,
    calificado: 'SI',
    observaciones
  };
  try {
    const patch = await Projects.findOneAndUpdate(filter, update, {
      new: true
    });

    if (!patch) {
      res.status(400).json({ message: 'Error al calificar el proyecto' });
    }
    res.status(200).json({ message: 'Trabajo Calificado con éxito' });
  } catch (error) {
    res.status(400).console.log(error);
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
