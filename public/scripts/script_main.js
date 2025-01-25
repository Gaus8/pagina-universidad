const anchor = document.querySelectorAll('.link-img');

anchor.forEach(elemento => {
  elemento.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('A oprimido');

    const id = e.target.id || 'No ID';
    console.log(id);
  });
});

console.log('HOLA MUNDO');
