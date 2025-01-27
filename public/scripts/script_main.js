import { Drop } from '../../pruebas.js';
const anchor = document.querySelectorAll('.link-img');
anchor.forEach(elemento => {
  elemento.addEventListener('click', (e) => {
    e.preventDefault();

    const id = e.target.id || 'No ID';
    const name = id;
  });
});

const solicitud = async(url);
