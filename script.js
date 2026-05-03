const data = {
  electrical: {
    "Outlet / Switch": {
      "Replace existing": 125,
      "New install": "custom"
    },
    "EV Charger Outlet": {
      "Inspection": 125,
      "Straightforward install - up to 5 ft": 350,
      "Install over 5 ft / added complexity": "custom"
    },
    "Lighting": {
      "Replace fixture": 125,
      "New install": "custom"
    }
  },

  plumbing: {
    "Faucet": {
      "Replace": 125,
      "Install": 150
    },
    "Toilet": {
      "Repair": 125,
      "Replace": 200
    }
  },

  repairs: {
    "Drywall": {
      "Small patch": 125,
      "Medium repair": "custom"
    },
    "Doors": {
      "Alignment": 125,
      "Hardware replacement": 150
    }
  },

  assembly: {
    "Furniture": {
      "Standard assembly": 125,
      "Large / complex assembly": "custom"
    },
    "Outdoor items": {
      "Standard assembly": 150,
      "Large / complex assembly": "custom"
    }
  },

  installation: {
    "Outdoor AC Condenser Cleaning": {
      "1 outdoor unit": 169,
      "2 outdoor units": 310,
      "3+ outdoor units": "custom"
    },
    "Shelving / Wall Hanging": {
      "Standard install": 125,
      "Multiple items": "custom"
    },
    "General Maintenance": {
      "Small task": 125,
      "Multiple tasks": "custom"
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
  resetDropdown(subEl, "Select Subcategory");
  resetDropdown(detailEl, "Select Detail");

  if (!category || !data[category]) return;

  Object.keys(data[category]).forEach(subcategory => {
    const option = document.createElement("option");
    option.value = subcategory;
    option.textContent = subcategory;
    subEl.appendChild(option);
  });
}

function loadDetails(category, subcategory) {
  resetDropdown(detailEl, "Select Detail");

  if (!category || !subcategory || !data[category][subcategory]) return;

  Object.keys(data[category][subcategory]).forEach(detail => {
    const option = document.createElement("option");
    option.value = detail;
    option.textContent = detail;
    detailEl.appendChild(option);
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
    resultEl.innerText = "Please complete all quote selections.";
    return;
  }

  const price = data[cat][sub][det];

  if (price === "custom") {
    resultEl.innerText = "Custom quote needed. Please submit the form below and we will follow up with a clear estimate.";
    return;
  }

  let message = `Estimated Labor: $${price}.`;

  if (sub === "EV Charger Outlet" && det === "Straightforward install - up to 5 ft") {
    message += " Includes a straightforward outlet installation up to 5 feet from the panel. Longer runs or added complexity are quoted before work begins.";
  }

  if (sub === "Outdoor AC Condenser Cleaning") {
    message += " Includes outdoor condenser cleaning, debris removal, and basic visual check.";
  }

  if (materials === "profix") {
    message += " Materials are priced separately.";
  }

  resultEl.innerText = message;
}

function scrollToQuote() {
  document.getElementById("quote").scrollIntoView({ behavior: "smooth" });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const btn = document.getElementById("darkToggle");
  btn.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
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
window.dispatchEvent(new Event("scroll"));

const reviewContainer = document.querySelector(".review-grid");
let scrollAmount = 0;

setInterval(() => {
  if (reviewContainer && reviewContainer.scrollWidth > reviewContainer.clientWidth) {
    scrollAmount += 1;
    reviewContainer.scrollLeft = scrollAmount;

    if (scrollAmount >= reviewContainer.scrollWidth - reviewContainer.clientWidth) {
      scrollAmount = 0;
    }
  }
}, 60);
