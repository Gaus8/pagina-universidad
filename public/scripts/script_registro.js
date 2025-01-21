const botonVentanaInicio = document.getElementById('boton-ventana-inicio');
const botonRegistroUsuarios = document.getElementById('boton-registro-usuarios');
const textoError = document.querySelectorAll('.errores');
const nombreValue = document.getElementById('nombres-registro');
const emailValue = document.getElementById('email-registro');
const passwordValue = document.getElementById('password-registro');

const registerUser = async (url, data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error) {
        textoError.forEach(elemento => {
          elemento.style.display = 'block';
        });
      }
    }
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.log('ERROR: ', error.message);
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

