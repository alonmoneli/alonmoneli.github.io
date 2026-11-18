const monitor = document.querySelector(".monitor");
const controls = monitor.querySelector(".scenario-controls");
const buttons = [...controls.querySelectorAll("button")];
const bars = [...monitor.querySelectorAll(".bar")];
const labels = [...monitor.querySelectorAll(".plot-labels li")];
const feed = monitor.querySelector(".event-feed");

const scenarios = {
  spike: [83, 88, 92, 86, 31],
  normal: [24, 39, 33, 46, 27],
};

function renderScenario(scenario) {
  let highSamples = 0;
  let alertActive = false;
  const events = [];

  scenarios[scenario].forEach((usage, index) => {
    const isHigh = usage >= 80;
    highSamples = isHigh ? highSamples + 1 : 0;
    let kind;
    if (!alertActive && highSamples === 3) {
      alertActive = true;
      kind = "Alert";
    } else if (alertActive && !isHigh) {
      alertActive = false;
      kind = "Recovered";
    }
    if (kind) {
      const event = document.createElement("span");
      event.className = "event";
      const title = document.createElement("b");
      title.textContent = kind;
      event.append(title, ` Sample ${index + 1}`);
      events.push(event);
    }

    bars[index].style.setProperty("--usage", `${usage}%`);
    bars[index].dataset.level = kind === "Alert" ? "event" : isHigh ? "high" : "normal";
    labels[index].lastChild.textContent = `${usage}%`;
  });

  if (events.length > 0) {
    feed.replaceChildren(...events);
  } else {
    feed.textContent = "No alert events";
  }
}

controls.hidden = false;
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.getAttribute("aria-pressed") === "true") return;
    buttons.forEach((option) => {
      option.setAttribute("aria-pressed", String(option === button));
    });
    renderScenario(button.dataset.scenario);
  });
});
