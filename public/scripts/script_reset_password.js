const newPassword = document.getElementById('new-password');
const confirmPassword = document.getElementById('confirm-password');
const message = document.getElementById('message');
const buttonSend = document.getElementById('btn-send');
const buttonCancel = document.getElementById('btn-cancel');

// Cambiar contraseña teniendo el token
const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*])[\S]{8,16}$/;


function visibility (inputId, buttonId) {
  const input = document.getElementById(inputId);
  const button = document.getElementById(buttonId);

  const showPassword = () => (input.type = 'text');
  const hidePassword = () => (input.type = 'password');

  button.addEventListener('mousedown', showPassword);
  button.addEventListener('mouseup', hidePassword);

  button.addEventListener('touchstart', showPassword);
  button.addEventListener('touchend', hidePassword);
}

function checkPassword () {
  if (confirmPassword.value === '') {
    message.textContent = '';
  } else if (confirmPassword.value === newPassword.value && regex.test(newPassword.value)) {
    buttonSend.disabled = false;
    message.textContent = '';
    buttonSend.style.background = '#129e29';
    buttonSend.style.color = '#FFF';
  } else if (confirmPassword.value !== newPassword.value && regex.test(newPassword.value)) {
    message.textContent = 'Las contraseñas no coinciden';
    buttonSend.disabled = true;
    buttonSend.style.background = 'none';
    buttonSend.style.color = '#707070';
  } else {
    message.textContent = 'Las contraseñas deben tener mínimo 8 caracteres, debe tener una mayúscula, una minúscula, un número y uno de los siguientes caracteres: .!@#$%^&*';
    buttonSend.disabled = true;
    buttonSend.style.background = 'none';
    buttonSend.style.color = '#707070';
  }
}

visibility('new-password', 'see-new-password');
visibility('confirm-password', 'see-confirm-password');
newPassword.addEventListener('input', checkPassword);
confirmPassword.addEventListener('input', checkPassword);

buttonSend.addEventListener('click', async (e) => {
  e.preventDefault();
  const password = newPassword.value;
  getData('/students/change_password', { password });
});

buttonCancel.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/students/main';
});

const getData = async (url, data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const responseData = await response.json();
    if (response.ok) {
      message.textContent = 'Se ha actualizado la contraseña';
      message.style.color = 'green';
    }
    message.textContent = responseData.message;
  } catch (error) {
    console.log(error);
  }
};
