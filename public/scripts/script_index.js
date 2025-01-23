const botonRegistro = document.getElementById('boton-ventana-registro');
const botonInicio = document.getElementById('boton-inicio-sesion');
const passwordValue = document.getElementById('password-login');
const emailValue = document.getElementById('email-login');

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
    return setTimeout(() => {
      window.location.href = '/registro';
    }, 500);
  }

  if (responseData.status === 'error') {
    if (Array.isArray(responseData.error)) {
      responseData.error.forEach(err => {
        window.alert(err.message); // Mostrar errores específicos
      });
    } else {
      window.alert(responseData.message); // Mostrar error general
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
  const email = emailValue.value;
  const password = passwordValue.value;

  if (!email || !password) {
    return window.alert('Asegurese de llenar todos lo campos');
  }
  loginUser('/', { email, password });
});

