const botonVentanaInicio = document.getElementById('boton-ventana-inicio');
const botonRegistroUsuarios = document.getElementById('boton-registro-usuarios');
const nombreValue = document.getElementById('nombres-registro');
const emailValue = document.getElementById('email-registro');
const passwordValue = document.getElementById('password-registro');
const nameText = document.getElementById('error-name');
const emailText = document.getElementById('error-email');
const passwordText = document.getElementById('error-password');
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
      window.location.href = '/';
    }, 500);
  }
  const errores = [];
  if (responseData.status === 'error') {
    if (Array.isArray(responseData.error)) {
      responseData.error.forEach(err => {
        errores.push(err.message);
      });
      showErrors(errores);
    } else {
      window.alert(responseData.message); // Mostrar error general
    }
  }
};

const showErrors = (arreglo) => {
  if (arreglo.length === 1) {
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i] === 'error1') {
        nameText.innerHTML = 'El nombre debe ser mayor a seis caracteres';
      } else if (arreglo[i] === 'error2') {
        emailText.innerHTML = 'El correo debe ser institucional';
      } else {
        passwordText.innerHTML = 'La contraseña debe tener una mayúscula, una minúscula y uno de los siguientes caracteres: .!@#$%^&*';
      }
    }
  } else {
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i] === 'error1') {
        nameText.innerHTML = 'El nombre debe ser mayor a seis caracteres';
      } else if (arreglo[i] === 'error2' || arreglo[i] === 'error3') {
        emailText.innerHTML = 'El correo debe ser institucional';
        passwordText.innerHTML = 'La contraseña debe tener una mayúscula, una minúscula y uno de los siguientes caracteres: .!@#$%^&*';
      }
    }
  }
};


botonRegistroUsuarios.addEventListener('click', async (event) => {
  event.preventDefault();
  const name = nombreValue.value;
  const email = emailValue.value.trim();
  const password = passwordValue.value.trim();

  if (!name || !email || !password) {
    return window.alert('Asegurese de llenar todos lo campos');
  };
  registerUser('/register', { name, email, password });
});

botonVentanaInicio.addEventListener('click', (event) => {
  event.preventDefault();
  setTimeout(() => {
    window.location.href = '/';
  }, 200);
});
