const themeToggler = document.getElementById("themeToggler");

console.log(localStorage.getItem('darkTheme'));

localStorage.getItem('darkTheme') === 'true' ? switchTheme(true) : switchTheme(false);

function switchTheme(darkTheme) {
  if (darkTheme) {
    console.log('switching to dark');
    document.documentElement.classList.add("dark");
    themeToggler.classList.add("switch_active");
    localStorage.setItem('darkTheme', darkTheme);
  } else {
    console.log('switching to light');
    document.documentElement.classList.remove("dark");
    themeToggler.classList.remove("switch_active");
    localStorage.setItem('darkTheme', darkTheme);
  }
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

themeToggler.addEventListener("click", (e) => {
  switchTheme(!isDark());
});