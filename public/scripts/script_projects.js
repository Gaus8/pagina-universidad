const projectNameValue = document.getElementById('project-name');
const email1Value = document.getElementById('email-number1');
const email2Value = document.getElementById('email-number2');
const buttonStudents = document.getElementById('button-students');
const buttonProject = document.getElementById('button-send-project');

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

buttonProject.addEventListener('click', (e) => {
  e.preventDefault();
  const projectName = projectNameValue.value;
  const email1 = email1Value.value.trim();
  const email2 = email2Value.value.trim();
  const ciclo = getSelectedRadio('ciclo').trim();

  if (getSelectedRadio('radio-students') === '1') {
    if (!projectName || !email1 || !ciclo) {
      return window.alert('ERROR');
    }
  } else {
    if (!projectName || !email1 || !email2 || !ciclo) {
      return window.alert('ERROR');
    }
  }
  console.log(`Proyecto: ${projectName}, Email 1: ${email1}${email2 ? `, Email 2: ${email2}` : ''}, Ciclo: ${ciclo}`);
});




const getSelectedRadio = (name) => {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : 'No hay ningún botón seleccionado';
};
