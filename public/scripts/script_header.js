const profile = document.getElementById('profile-icon');
const logout = document.getElementById('logout');

profile.addEventListener('click', () => {
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

const logoutSesion = async (e) => {
  e.preventDefault();

  try {
    await fetch('/logout',
      {
        method: 'POST',
        credentials: 'include'
      });
    window.location.href = '/';
  } catch (error) {
    window.alert(error);
  }
};


logout.addEventListener('click', logoutSesion);

