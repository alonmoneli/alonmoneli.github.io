(() => {
  const storageKey = "alon-moneli-color-theme";
  const root = document.documentElement;
  const systemTheme = matchMedia("(prefers-color-scheme: dark)");
  let preferredTheme;

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
      preferredTheme = savedTheme;
      root.dataset.theme = savedTheme;
    }
  } catch {
    // A theme can still be used for this visit when storage is unavailable.
  }

  document.addEventListener("DOMContentLoaded", () => {
    const switcher = document.querySelector(".theme-switch");
    const buttons = switcher.querySelectorAll("button");

    function updateButtons() {
      const activeTheme = preferredTheme ?? (systemTheme.matches ? "dark" : "light");
      for (const button of buttons) {
        button.setAttribute("aria-pressed", String(button.dataset.colorTheme === activeTheme));
      }
    }

    for (const button of buttons) {
      button.addEventListener("click", () => {
        preferredTheme = button.dataset.colorTheme;
        root.dataset.theme = preferredTheme;
        try {
          localStorage.setItem(storageKey, preferredTheme);
        } catch {
          // The current selection still applies to the page.
        }
        updateButtons();
      });
    }

    systemTheme.addEventListener("change", updateButtons);
    updateButtons();
    switcher.hidden = false;
  });
})();
