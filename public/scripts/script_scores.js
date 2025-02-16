const buttonFindProjects = document.getElementById('btn-find-projects');
const createDiv = document.querySelector('.js-studens-projects');
buttonFindProjects.addEventListener('click', (e) => {
  e.preventDefault();
  const ciclo = getSelectedRadio('radio-ciclo');
  findProjects('/professor/scores', { ciclo });
});


const findProjects = async (url, ciclo = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(ciclo),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Error en la consulta de proyectos');
    const responseData = await response.json();
    createProjectDiv(responseData.projects);
    console.log(responseData.projects);
  } catch (error) {
    console.error('Error en findProjects:', error);
  }
};


function getSelectedRadio (name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : 'No hay ningún botón seleccionado';
};

function createProjectDiv (projects) {
  let html = '';
  projects.forEach(project => {
    html += `
    <p>${project.projectName}</p>
    <a href="${project.fileUrl.replace('dl=0','dl1')}" target="_blanket"><img src="/img/imagen_pdf.png" width="30px"></a>
    <p>${project.email1}</p>
    <p>${project.email2 || ''}</p>
    <input type='text' id='input-grade-${project._id}'>
    <textarea>Escribe</textarea>
    <button id='btn-${project._id}'>Calificar</button>
    `;
  });
  createDiv.innerHTML = html;

  projects.forEach((project) => {
    const button = document.getElementById(`btn-${project._id}`);
    const input = document.getElementById(`input-grade-${project._id}`);

    button.addEventListener('click', () => {
      const grade = input.value;  // Captura el valor ingresado en el input
      console.log(`Calificación para ${project.projectName} (ID: ${project._id}): ${grade}`);

      // Aquí puedes enviar el valor de la calificación al servidor o almacenarlo
    });
  });
}
