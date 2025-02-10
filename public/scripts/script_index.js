const botonRegistro = document.getElementById('boton-ventana-registro');
const botonInicio = document.getElementById('boton-inicio-sesion');
const passwordValue = document.getElementById('password-login');
const emailValue = document.getElementById('email-login');
const errorText = document.getElementById('error-login');

const loginUser = async (url, data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const responseData = await response.json();
  if (response.ok) {
    window.alert(responseData.message);
    if (responseData.role === 'student') {
      return setTimeout(() => {
        window.location.href = '/students/main';
      }, 500);
    }
    else if (responseData.role === 'professor') {
      return setTimeout(() => {
        window.location.href = '/professor/main';
      }, 500);
    }
    else if (responseData.role === 'admin') {
      return setTimeout(() => {
        window.location.href = '/admin/main';
      }, 500);
    }
  }

  if (responseData.status === 'error') {
    if (Array.isArray(responseData.error)) {
      responseData.error.forEach(err => {
        if (err.message === 'error2' || err.message === 'error3') {
          errorText.innerHTML = 'Email o contraseña incorrecta';
        }
      });
    } else {
      errorText.innerHTML = (responseData.message); // Mostrar error general
    }
  }
};








// EVENTS
botonRegistro.addEventListener('click', (event) => {
  event.preventDefault();
  setTimeout(() => {
    window.location.href = '/register';
  }, 200);
});




botonInicio.addEventListener('click', (event) => {
  event.preventDefault();
  const email = emailValue.value.trim();
  const password = passwordValue.value.trim();

  if (!email || !password) {
    return window.alert('Asegurese de llenar todos lo campos');
  }
  loginUser('/', { email, password });
});

