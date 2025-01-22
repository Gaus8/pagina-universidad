const botonVentanaInicio = document.getElementById('boton-ventana-inicio');
const botonRegistroUsuarios = document.getElementById('boton-registro-usuarios');
const nombreValue = document.getElementById('nombres-registro');
const emailValue = document.getElementById('email-registro');
const passwordValue = document.getElementById('password-registro');

const registerUser = async (url, data = {}) => {
  // RECIBIR DATOS
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    validateResponse(response);
  } catch (error) {
    console.error('ERROR:', error.message);
    window.alert('Ocurrió un error en la comunicación con el servidor.');
  }
};

const validateResponse = async (response) => {
  const responseData = await response.json();
  // CREAR USUARIO EXITOSAMENTE
  if (response.ok) {
    window.alert(responseData.message);
    return setTimeout(() => {
      window.location.href = '/inicio/index.html';
    }, 2000);
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

botonRegistroUsuarios.addEventListener('click', async (event) => {
  event.preventDefault();
  const name = nombreValue.value;
  const email = emailValue.value;
  const password = passwordValue.value;

  if (!name || !email || !password) {
    return window.alert('Asegurese de llenar todos lo campos');
  };
  registerUser('/inicio/registro', { name, email, password });
});

botonVentanaInicio.addEventListener('click', (event) => {
  event.preventDefault();
  setTimeout(() => {
    window.location.href = '/inicio/index.html';
  }, 200);
});
