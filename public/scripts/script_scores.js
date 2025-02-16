const buttonFindProjects = document.getElementById('btn-find-projects');
const containerDiv = document.querySelector('.js-display-projects ');
const textH3 = document.getElementById('js-text-projects');


let ciclo = localStorage.getItem('ciclo') || '';
buttonFindProjects.addEventListener('click', (e) => {
  e.preventDefault();
  ciclo = getSelectedRadio('radio-ciclo');
  localStorage.setItem('ciclo', ciclo);
  findProjects('/professor/scores', { ciclo }, ciclo);
  document.querySelector('.js-container-projects').style.display = 'block';
});


const findProjects = async (url, ciclo = {}, ciclos) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(ciclo),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Error en la consulta de proyectos');
    const responseData = await response.json();
    createProjectDiv(responseData.projects);
    if (responseData.projects.length === 0) {
      textH3.innerHTML = 'No se han registrado proyectos';
    } else {
      textH3.innerHTML = `Calificación de Proyectos Ciclo ${ciclos}`;
    }
  } catch (error) {
    console.error('Error en findProjects:', error);
  }
};

function createProjectDiv (projects) {
  let html = '';
  const projectsQualified = projects.filter(project => project.calificado === 'NO');

  projectsQualified.forEach(project => {
    html += `
      <div class='js-students-projects'>
        <h5>${project.projectName}</h5>
        <a href="${project.fileUrl}" target="_blanket"><img src="/img/imagen_pdf.png" width="30px"></a>
        <div class="js-students-email">
          <p>Correo</p>
          <p>${project.email1}</p>
          <p>${project.email2 || ''}</p>
        </div> 
        <div class='js-students-grades'>
          <div> 
            <label for="input-grade-${project._id}">Calificación</label>
            <input type='text' id='input-grade-${project._id}'>
          </div>
         
          <textarea id='input-area-${project._id}' placeholder='Observaciones'></textarea>
        </div>
        <button class="js-button-qualify" id='btn-${project._id}'>Calificar</button>
        <p class="js-text-qualify" id='paragraph-${project._id}'></p>
      </div>
      `;
  });


  containerDiv.innerHTML = html;

  projectsQualified.forEach(project => {
    const id = project._id;
    const button = document.getElementById(`btn-${project._id}`);
    const inputText = document.getElementById(`input-grade-${project._id}`);
    const intputTextArea = document.getElementById(`input-area-${project._id}`);
    const paragraph = document.getElementById(`paragraph-${project._id}`);

    button.addEventListener('click', async () => {
      const nota = inputText.value;
      const observaciones = intputTextArea.value;
      if (!nota || !observaciones) {
        return window.alert('Asegurese de colocar la nota y las observaciones');
      }
      paragraph.textContent = 'Enviando Proyecto...';
      const message = await qualifyProjects('/professor/scores', { nota, observaciones, id });
      paragraph.textContent = message;
      setTimeout(() => {
        findProjects('/professor/scores', { ciclo }, ciclo);
      }, 2000);
    });
  });
}


const qualifyProjects = async (url, data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Error en la calificación de proyectos');
    const responseData = await response.json();
    return responseData.message;
  } catch (error) {
    console.error('Error en findProjects:', error);
  }
};

function getSelectedRadio (name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : 'No hay ningún botón seleccionado';
};

con;
