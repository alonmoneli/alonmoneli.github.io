(() => {
  const filters = document.querySelector(".project-filters");
  const projects = [...document.querySelectorAll("[data-project-languages]")];
  const count = filters.querySelector(".project-count");

  function applyFilter() {
    const language = filters.querySelector("input:checked").value;
    let visible = 0;

    for (const project of projects) {
      const languages = project.dataset.projectLanguages.split(" ");
      const matches = language === "all" || languages.includes(language);
      project.hidden = !matches;
      if (matches) visible += 1;
    }

    count.textContent = visible === 1 ? "1 project" : `${visible} projects`;
  }

  filters.addEventListener("change", applyFilter);
  applyFilter();
  filters.hidden = false;
})();
