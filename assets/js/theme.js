//Has to be in the head tag, otherwise a flicker effect will occur.
let initTheme = (theme) => {
  if (theme == null) {
    const userPref = window.matchMedia;
    if (userPref && userPref('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
    }
  }

  if (theme)  {
    document.documentElement.setAttribute('data-theme', theme)
  }

  localStorage.setItem("theme", theme);
}
// The value stored in `theme` is null only on the first run. This triggers the
// black theme being set as the default. Later, the value stored in `theme`
// will be "null" as a result of the user switching off the dark mode
if(localStorage.getItem("theme") === null){
  localStorage.setItem("theme", "null");
}
initTheme(localStorage.getItem("theme"));
