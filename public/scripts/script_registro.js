
const  botonVentanaInicio = document.getElementById('boton-ventana-inicio');
const botonRegistroUsuarios= document.getElementById('boton-registro-usuarios');

const nombreValue = document.getElementById('nombres-registro');
const emailValue = document.getElementById('email-registro');
const passwordValue = document.getElementById('password-registro');

const recibirDatos = async (url='',data={}) =>{
    try{
        const response = await fetch(url,{
            method:'POST',
            mode: 'cors',
            cache:'no-cache',
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error(`Error en la solicitud: ${response.status}`)
        }
        return await response.json(data);
    }catch (error){
        console.error('Error al realizar la solicitud:', error);
        throw error;
    }
    }
   


botonRegistroUsuarios.addEventListener('click',async (event) =>{
    event.preventDefault();
    const nombres = nombreValue.value;
    const email = emailValue.value;
    const password = passwordValue.value;
    
    if(!nombres || !email || !password){
       return window.alert("Asegurese de llenar todos lo campos");
    }
    try{
       const resultado = await recibirDatos('/inicio/registro',{ nombres, email, password });
       window.alert('Registro Exitoso');
       console.log('Respuesta del servidor:', resultado);
    }catch (error){

    }
});

botonVentanaInicio.addEventListener('click',(event) =>{
    event.preventDefault();
    setTimeout(()=>{
        window.location.href = '/inicio/index.html';
    },200);
})

