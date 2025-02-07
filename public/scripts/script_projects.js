const projectNameinput = document.getElementById('project-name');
const email1Input = document.getElementById('email-number1');
const email2Input = document.getElementById('email-number2-txt');
const fileInput = document.getElementById('file-upload');
const slideInput = document.getElementById('slide-upload');
const finalText = document.getElementById('final-text-paragraph');

// Buttons
const studentsButton = document.getElementById('button-students');
const sendProjectButton = document.getElementById('button-send-project');
const updateProjectButton = document.getElementById('button-update-project');

const finalDiv = document.querySelector('.final-text');

const sendProject = async (url, formdata) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formdata
    });
    const result = await response.json();
    getResponse(response, result);
  } catch (error) {
    finalText.style.color = 'red';
    finalText.innerHTML = 'Error al enviar el archivo';
  }
};

studentsButton.addEventListener('click', (e) => {
  e.preventDefault();
  displayAndHide();
});


if (sendProjectButton !== null) {
  sendProjectButton.addEventListener('click', async (e) => {
    e.preventDefault();
    await getDataPost();
  });
}

if (updateProjectButton !== null) {
  updateProjectButton.addEventListener('click', async (e) => {
    e.preventDefault();
    await getDataPatch();
  });
}

async function getDataPost () {
  const radioStudents = getSelectedRadio('radio-students');
  const radioFormat = getSelectedRadio('radio-formato');
  const projectName = projectNameinput.value;
  const email1 = email1Input.value.trim();
  const email2 = email2Input.value.trim();
  const ciclo = getSelectedRadio('ciclo').trim();
  const file = fileInput.files[0];
  const slides = slideInput.files[0];

  if (radioStudents === '1' && radioFormat === 'formato1') {
    if (!projectName || !email1 || !ciclo || !file) {
      return window.alert('Asegurese de llenar todos los campos');
    }
  } else if (radioStudents === '1' && radioFormat === 'formato2') {
    if (!projectName || !email1 || !ciclo || !file || !slides) {
      return window.alert('Asegurese de llenar todos los campos');
    }
  } else if (radioStudents === '2' && radioFormat === 'formato1') {
    if (!projectName || !email1 || !email2 || !ciclo || !file) {
      return window.alert('Asegurese de llenar todos los campos');
    }
  } else {
    if (!projectName || !email1 || !email2 || !ciclo || !file || !slides) {
      return window.alert('Asegurese de llenar todos los campos');
    }
  }

  const formData = new FormData();
  formData.append('projectName', projectName);
  formData.append('email1', email1);
  if (email2 !== '') formData.append('email2', email2);
  formData.append('ciclo', ciclo);
  formData.append('file', file);
  if (slides) formData.append('slides', slides);
  
  finalDiv.style.display = 'block';
  finalText.style.color = 'green';
  finalText.innerHTML = 'Enviando proyecto ...';
  await sendProject('/students/projects', formData);
}

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
  setTimeout(() => {
    cleanFields();
    window.location.href = '/students/projects';
  }, 3000);
  return true;
};

function displayAndHide () {
  if (getSelectedRadio('radio-students') === '1' && getSelectedRadio('radio-formato') === 'formato1') {
    document.querySelector('.amount-students').style.display = 'none';
    document.getElementById('email-number2').style.display = 'none';
    document.querySelector('.form-container').style.display = 'block';
    document.getElementById('slides').style.display = 'none';
    document.getElementById('span-slides').style.display = 'none';
  } else if (getSelectedRadio('radio-students') === '2' && getSelectedRadio('radio-formato') === 'formato1') {
    document.querySelector('.amount-students').style.display = 'none';
    document.querySelector('.form-container').style.display = 'block';
    document.getElementById('slides').style.display = 'none';
    document.getElementById('span-slides').style.display = 'none';
  } else if (getSelectedRadio('radio-students') === '1' && getSelectedRadio('radio-formato') === 'formato2') {
    document.querySelector('.amount-students').style.display = 'none';
    document.getElementById('email-number2').style.display = 'none';
    document.querySelector('.form-container').style.display = 'block';
  } else if (getSelectedRadio('radio-students') === '2' && getSelectedRadio('radio-formato') === 'formato2') {
    document.querySelector('.amount-students').style.display = 'none';
    document.querySelector('.form-container').style.display = 'block';
  }
};

function getSelectedRadio (name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : 'No hay ningún botón seleccionado';
};

function cleanFields () {
  projectNameinput.value = '';
  email1Input.value = '';
  email2Input.value = '';
  fileInput.value = '';
  finalText.innerHTML = '';
};


const updateProject = async (url, formdata) => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      body: formdata
    });
    const result = await response.json();
    getResponse(response, result);
  } catch (error) {
    finalText.style.color = 'red';
    finalText.innerHTML = 'Error al enviar el archivo';
  }
};

async function getDataPatch () {
  const radioStudents = getSelectedRadio('radio-students');
  const radioFormat = getSelectedRadio('radio-formato');
  const projectName = projectNameinput.value;
  const email1 = email1Input.value.trim();
  const email2 = email2Input.value.trim();
  const ciclo = getSelectedRadio('ciclo').trim();
  const file = fileInput.files[0];
  const slides = slideInput.files[0];

  if (radioStudents === '1' && radioFormat === 'formato1') {
    if (!projectName || !email1 || !ciclo || !file) {
      return window.alert('Asegurese de llenar todos los campos');
    }
  } else if (radioStudents === '1' && radioFormat === 'formato2') {
    if (!projectName || !email1 || !ciclo || !file || !slides) {
      return window.alert('Asegurese de llenar todos los campos');
    }
  } else if (radioStudents === '2' && radioFormat === 'formato1') {
    if (!projectName || !email1 || !email2 || !ciclo || !file) {
      return window.alert('Asegurese de llenar todos los campos');
    }
  } else {
    if (!projectName || !email1 || !email2 || !ciclo || !file || !slides) {
      return window.alert('Asegurese de llenar todos los campos');
    }
  }

  const formData = new FormData();
  formData.append('projectName', projectName);
  formData.append('email1', email1);
  if (email2 !== '') formData.append('email2', email2);
  formData.append('ciclo', ciclo);
  formData.append('file', file);
  if (slides) formData.append('slides', slides);
  finalDiv.style.display = 'block';
  finalText.style.color = 'green';
  finalText.innerHTML = 'Enviando proyecto ...';
  await updateProject('/students/projects', formData);
}

