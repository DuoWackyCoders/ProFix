const data = {
  electrical: {
    "Outlet / Switch": {
      "Single replacement": 125,
      "Multiple replacements": "custom"
    },
    "GFCI Outlet": {
      "Replace": 95
    },
    "EV Charger Outlet": {
      "Inspection": 75,
      "Up to 5 ft install": 350,
      "Over 5 ft / complex install": "custom"
    },
    "Lighting": {
      "Standard fixture": 125,
      "Complex / high ceiling": "custom"
    }
  },

  plumbing: {
    "Faucet": {
      "Replace": 135,
      "Complex install": "custom"
    },
    "Shower Cartridge": {
      "Replace": 125
    },
    "Garbage Disposal": {
      "Replace existing": 150,
      "New install": "custom"
    }
  },

  repairs: {
    "Drywall": {
      "Small patch": 100,
      "Medium repair": "custom"
    },
    "Doors": {
      "Hardware replacement": 150,
      "Alignment / adjustment": 125
    },
    "Drawer Repair": {
      "Adjustment / track fix": 125
    }
  },

  assembly: {
    "Furniture": {
      "Standard": 125,
      "Large / complex": 175
    },
    "Outdoor items": {
      "Standard": 175,
      "Complex": "custom"
    }
  },

  installation: {
    "AC Condenser Cleaning": {
      "Single unit": 169,
      "Two units": 310,
      "Three or more": "custom"
    },
    "Shelving": {
      "Standard": 125,
      "Multiple items": "custom"
    },
    "Curtains / Blinds": {
      "Standard install": 125,
      "Multiple windows": "custom"
    },
    "Sprinkler Repair": {
      "1 head repair": 125,
      "Multiple heads": "custom"
    }
  }
};

const categoryEl = document.getElementById("category");
const subEl = document.getElementById("subcategory");
const detailEl = document.getElementById("details");
const resultEl = document.getElementById("result");

function resetDropdown(dropdown, text) {
  dropdown.innerHTML = "";
  const option = document.createElement("option");
  option.value = "";
  option.textContent = text;
  dropdown.appendChild(option);
}

function loadSubcategories(category) {
  resetDropdown(subEl, "Select Service");
  resetDropdown(detailEl, "Select Option");

  if (!data[category]) return;

  Object.keys(data[category]).forEach(sub => {
    let opt = document.createElement("option");
    opt.value = sub;
    opt.textContent = sub;
    subEl.appendChild(opt);
  });
}

function loadDetails(category, sub) {
  resetDropdown(detailEl, "Select Option");

  if (!data[category][sub]) return;

  Object.keys(data[category][sub]).forEach(detail => {
    let opt = document.createElement("option");
    opt.value = detail;
    opt.textContent = detail;
    detailEl.appendChild(opt);
  });
}

categoryEl.addEventListener("change", () => {
  loadSubcategories(categoryEl.value);
  resultEl.innerText = "";
});

subEl.addEventListener("change", () => {
  loadDetails(categoryEl.value, subEl.value);
  resultEl.innerText = "";
});

detailEl.addEventListener("change", () => {
  resultEl.innerText = "";
});

function generateQuote() {
  const cat = categoryEl.value;
  const sub = subEl.value;
  const det = detailEl.value;
  const materials = document.getElementById("materials").value;

  if (!cat || !sub || !det) {
    resultEl.innerText = "Please complete all selections.";
    return;
  }

  const price = data[cat][sub][det];

  if (price === "custom") {
    resultEl.innerText = "This job depends on layout and conditions. Submit request and we’ll provide a clear estimate.";
    return;
  }

  let message = `Estimated Labor: $${price}.`;

  if (sub === "EV Charger Outlet") {
    message += " Includes standard installation up to 5 ft from panel. Additional distance or complexity will be reviewed before work.";
  }

  if (sub === "AC Condenser Cleaning") {
    message += " Includes full outdoor cleaning and basic visual check of components.";
  }

  if (materials === "profix") {
    message += " Materials are billed separately.";
  }

  resultEl.innerText = message;
}

function scrollToQuote() {
  document.getElementById("quote").scrollIntoView({ behavior: "smooth" });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  document.getElementById("darkToggle").innerText =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
}

function selectService(category) {
  categoryEl.value = category;
  loadSubcategories(category);
  scrollToQuote();
}

const sections = document.querySelectorAll("section");

function revealSections() {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      sec.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);
