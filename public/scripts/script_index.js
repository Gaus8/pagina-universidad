const botonRegistro = document.getElementById('boton-ventana-registro');
const botonInicio = document.getElementById('boton-inicio-sesion');

botonRegistro.addEventListener('click',(event) =>{
    event.preventDefault();
    setTimeout(()=>{
        window.location.href = '/inicio/registro.html';
    },200)
    
 
});

  


botonInicio.addEventListener('click',(event) =>{
    event.preventDefault();
    console.log("HOLA MUNDO")
});






