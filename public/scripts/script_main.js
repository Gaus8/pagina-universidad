const anchor = document.querySelectorAll('.link-img');


anchor.forEach(elemento => {
  elemento.addEventListener('click', (e) => {
    e.preventDefault();

    const id = e.target.id || 'No ID';
      
    // Realizar solicitud al servidor
    fetch(`/students/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al descargar el archivo');
        }
        return response.blob(); // Convertir la respuesta a un blob
      })
      .then(blob => {
        // Crear enlace para la descarga
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = id; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => console.error('Error:', error));
  });
});
