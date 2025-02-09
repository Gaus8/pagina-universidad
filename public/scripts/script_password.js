const newPassword = document.getElementById('new-password');
const confirmPassword = document.getElementById('confirm-password');
const message = document.getElementById('message');
const buttonSend = document.getElementById('btn-send');


function visibility (inputId, buttonId) {
  const input = document.getElementById(inputId);
  const button = document.getElementById(buttonId);

  button.addEventListener('mousedown', () => {
    input.type = 'text';
  });

  button.addEventListener('mouseup', () => {
    input.type = 'password';
  });

  button.addEventListener('mouseleave', () => {
    input.type = 'password';
  });
}

function checkPassword () {
  if (confirmPassword.value === '') {
    message.textContent = '';
  } else if (confirmPassword.value === newPassword.value) {
    buttonSend.enabled = true;
    message.textContent = ' Las contraseñas coinciden';
    buttonSend.style.background = '#52e795';
  } else {
    message.textContent = '❌ Las contraseñas no coinciden';
  }
}




visibility('new-password', 'see-new-password');
visibility('confirm-password', 'see-confirm-password');
newPassword.addEventListener('input', checkPassword);
confirmPassword.addEventListener('input', checkPassword);