const projectNameValue = document.getElementById('project-name');
const email1Value = document.getElementById('email-number1');
const email2Value = document.getElementById('email-number2');
const fileInput = document.getElementById('file-upload');
const finalText = document.getElementById('final-text-paragraph');

// Buttons
const buttonStudents = document.getElementById('button-students');
const buttonProject = document.getElementById('button-send-project');
const buttonFindProject = document.getElementById('button-get-grade');
const finalDiv = document.querySelector('.final-text');

buttonFindProject.addEventListener('click', (e) => {
  e.preventDefault();
  getProject();
});

const getProject = () => {
  fetch('/projects', {
    method: 'GET',
    credentials: 'include' // Importante: esto permite que se envíen cookies con la petición
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};


const sendProject = async (url, formdata) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formdata
    });
    const result = await response.json();
    getResponse(response, result);
  } catch (error) {
    console.log('ERROR: ' + error);
  }
};


buttonStudents.addEventListener('click', (e) => {
  e.preventDefault();
  displayAndHide();
});

buttonProject.addEventListener('click', async (e) => {
  e.preventDefault();
  await getData();
});



async function getData () {
  const projectName = projectNameValue.value;
  const email1 = email1Value.value.trim();
  const email2 = email2Value.value.trim();
  const ciclo = getSelectedRadio('ciclo').trim();
  const file = fileInput.files[0];

  if (getSelectedRadio('radio-students') === '1') {
    if (!projectName || !email1 || !ciclo || !file) {
      return window.alert('Asegurese de llenar todos los campos');
    }
  } else {
    if (!projectName || !email1 || !email2 || !ciclo || !file) {
      return window.alert('Asegurese de llenar todos los campos');
    }
  }
  const formData = new FormData();
  formData.append('projectName', projectName);
  formData.append('email1', email1);
  formData.append('email2', email2);
  formData.append('ciclo', ciclo);
  formData.append('file', file);

  finalDiv.style.display = 'block';
  finalText.style.color = 'green';
  finalText.innerHTML = 'Enviando proyecto ...';
  await sendProject('/students/projects', formData);
}

function displayAndHide () {
  if (getSelectedRadio('radio-students') === '1') {
    document.querySelector('.amount-students').style.display = 'none';
    document.getElementById('email-number2').style.display = 'none';
    document.querySelector('.form-container').style.display = 'block';
  } else {
    document.querySelector('.amount-students').style.display = 'none';
    document.querySelector('.form-container').style.display = 'block';
  }
};

function getSelectedRadio (name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : 'No hay ningún botón seleccionado';
};


function cleanFields () {
  projectNameValue.value = '';
  email1Value.value = '';
  email2Value.value = '';
  fileInput.value = '';
};

function getResponse (response, result) {
  if (!response.ok) {
    finalDiv.style.display = 'block';
    finalText.style.color = 'red';
    if (result.status === 'error') {
      finalText.innerHTML = 'El nombre del proyecto debe poseer mas de 12 caracteres. <br>El correo debe ser institucional.';
    } else {
      finalText.innerHTML = result.message;
    }
    return false;
  }
  finalText.innerHTML = result.message;
  cleanFields();
  document.querySelector('.form-container').style.display = 'none';
  document.querySelector('.container-special-buttons').style.display = 'block';
  return true;
};






