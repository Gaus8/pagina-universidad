// Cambiar contraseña cuando se olvida
const buttonEmail = document.getElementById('btn-send-email');
const inputEmail = document.getElementById('input-email');
const message = document.getElementById('message');

buttonEmail.addEventListener('click', () => {
  const email = inputEmail.value.trim();
  sendEmail('/recover_password', { email });
});

const sendEmail = async (url, data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    message.textContent = responseData.message;
    message.style.color = 'green';
  } catch (error) {
    message.textContent = error.message;
    message.style.color = 'red';
  }
};
