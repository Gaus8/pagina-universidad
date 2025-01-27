const projectNameValue = document.getElementById('project-name');
const email1Value = document.getElementById('email-number1');
const email2Value = document.getElementById('email-number2');
const buttonStudents = document.getElementById('button-students');
const buttonProject = document.getElementById('button-send-project');
const fileInput = document.getElementById('file-upload');

const sendProject = async (url, formdata) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formdata
    });

    if (!response.ok) {
      console.log(response.message);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

buttonStudents.addEventListener('click', (e) => {
  e.preventDefault();
  if (getSelectedRadio('radio-students') === '1') {
    document.querySelector('.amount-students').style.display = 'none';
    document.getElementById('email-number2').style.display = 'none';
    document.querySelector('.form-container').style.display = 'block';
  } else {
    document.querySelector('.amount-students').style.display = 'none';
    document.querySelector('.form-container').style.display = 'block';
  }
});

buttonProject.addEventListener('click', async (e) => {
  e.preventDefault();
  const projectName = projectNameValue.value;
  const email1 = email1Value.value.trim();
  const email2 = email2Value.value.trim();
  const ciclo = getSelectedRadio('ciclo').trim();
  const file = fileInput.files[0];

  if (getSelectedRadio('radio-students') === '1') {
    if (!projectName || !email1 || !ciclo || !file) {
      return window.alert('ERROR');
    }
  } else {
    if (!projectName || !email1 || !email2 || !ciclo || !file) {
      return window.alert('ERROR');
    }
  }

  const formData = new FormData();
  formData.append('projectName', projectName);
  formData.append('email1', email1);
  formData.append('email2', email2);
  formData.append('ciclo', ciclo);
  formData.append('file', file);

  console.log(`Enviando proyecto: ${projectName}, Email 1: ${email1}${email2 ? `, Email 2: ${email2}` : ''}, Ciclo: ${ciclo}`);

  // Llamar a la función para enviar el proyecto
  await sendProject('/students/projects', formData);
});




const getSelectedRadio = (name) => {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : 'No hay ningún botón seleccionado';
};
