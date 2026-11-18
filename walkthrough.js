(() => {
  const walkthrough = document.querySelector(".walkthrough");
  const controls = walkthrough.querySelector(".walkthrough-options");
  const steps = walkthrough.querySelectorAll("[data-walkthrough-step]");

  function showStep() {
    const active = controls.querySelector("input:checked").value;
    for (const step of steps) {
      step.hidden = step.dataset.walkthroughStep !== active;
    }
  }

  controls.addEventListener("change", showStep);
  showStep();
  controls.hidden = false;
})();
