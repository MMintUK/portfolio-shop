/* Test early for local storage color scheme value to avoid FOIT */
const currentColorscheme = localStorage.getItem("halide-color-scheme");
let isDark;

/* Always set dark theme by default */
document.documentElement.setAttribute("dark", true);
isDark = true;

window.addEventListener("DOMContentLoaded", (event) => {

  // Header color scheme toggle (light/dark modes)
  const csToggle = document.querySelector(".dark-toggle");

  if (isDark) {
    csToggle.checked = true;
  }

  if (csToggle) {

    csToggle.addEventListener("change", () => {

      document.documentElement.toggleAttribute("dark");

      let cs = "light";

      if (document.documentElement.hasAttribute("dark")) {
        cs = "dark";
      }

      localStorage.setItem("halide-color-scheme", cs);

    });

  }

});
