localStorage.getItem('darkTheme') === 'true' ? switchTheme(true) : switchTheme(false);

function switchTheme(darkTheme, toggler) {
  if (darkTheme) {
    console.log('switching to dark');
    document.documentElement.classList.add("dark");
    localStorage.setItem('darkTheme', darkTheme);
  } else {
    console.log('switching to light');
    document.documentElement.classList.remove("dark");
    localStorage.setItem('darkTheme', darkTheme);
  }
  toggler && togglerClassHandler(toggler, darkTheme);
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

function togglerClassHandler(toggler, isDark) {
  if (isDark) {
    toggler.classList.add('switch_active');
  } else {
    toggler.classList.remove('switch_active');
  }
}

window.onload = () => {
  const themeToggler = document.getElementById("themeToggler");

  togglerClassHandler(themeToggler, isDark());

  themeToggler.addEventListener("click", (e) => {
    switchTheme(!isDark(), themeToggler);
  });
}

// document.addEventListener('DOMContentLoaded', () => {
//   const themeToggler = document.getElementById("themeToggler");

//   togglerClassHandler(themeToggler, isDark());

//   themeToggler.addEventListener("click", (e) => {
//     switchTheme(!isDark(), themeToggler);
//   });
// });