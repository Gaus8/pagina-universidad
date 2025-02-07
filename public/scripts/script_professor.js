document.getElementById('profile-icon').addEventListener('click', function () {
  const menu = document.getElementById('dropdown-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function (event) {
  const profileIcon = document.getElementById('profile-icon');
  const menu = document.getElementById('dropdown-menu');

  if (!profileIcon.contains(event.target) && !menu.contains(event.target)) {
    menu.style.display = 'none';
  }
});
