const storedThemeValue = localStorage.getItem('darkTheme');

if (storedThemeValue === 'true') {
  switchTheme(true);
} else if (storedThemeValue === 'false') {
  switchTheme(false);
} else {
  switchTheme(osColorScheme());
}

function switchTheme(darkTheme, toggler) {
  if (darkTheme) {
    document.documentElement.classList.add("dark");
    localStorage.setItem('darkTheme', darkTheme);
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem('darkTheme', darkTheme);
  }
  toggler && togglerClassHandler(toggler, darkTheme);
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

function osColorScheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function togglerClassHandler(toggler, isDark) {
  if (isDark) {
    toggler.classList.add('switch_active');
  } else {
    toggler.classList.remove('switch_active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const themeToggler = document.getElementById("themeToggler");

  togglerClassHandler(themeToggler, isDark());

  themeToggler.addEventListener("click", (e) => {
    switchTheme(!isDark(), themeToggler);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    switchTheme(e.matches, themeToggler);
  });
});