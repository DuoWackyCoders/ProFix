const data = {
  electrical: {
    "Outlet / Switch": {
      "1–5 standard outlets or switches": 125,
      "6–15 outlets or switches": "custom_outlet_6_15",
      "16–30 outlets or switches": "custom_outlet_16_30",
      "30+ outlets or switches": "custom_outlet_30_plus"
    },
    "GFCI Outlet": {
      "Replace existing GFCI": 95
    },
    "EV Charger Outlet": {
      "Inspection only": 75,
      "Standard install within 5 ft": 350,
      "Install beyond 5 ft or added complexity": "custom"
    },
    "Lighting": {
      "Standard fixture replacement": 125,
      "Large, high, or complex fixture": "custom"
    }
  },

  plumbing: {
    "Faucet": {
      "Standard replacement": 135,
      "Complex install": "custom"
    },
    "Shower Cartridge": {
      "Standard replacement": 125
    },
    "Garbage Disposal": {
      "Standard replacement": 150,
      "New install": 250,
      "Added plumbing or electrical modifications": "custom"
    }
  },

  repairs: {
    "Drywall": {
      "Small patch": 125,
      "Medium repair": "custom"
    },
    "Doors": {
      "Hardware replacement - first door": 150,
      "Additional door hardware": 75,
      "Alignment / adjustment": 125
    },
    "Drawer Repair": {
      "Track or soft-close adjustment": 125
    }
  },

  assembly: {
    "Furniture": {
      "Standard assembly": 125,
      "Large or complex assembly": 175
    },
    "Outdoor Items": {
      "Standard assembly": 175,
      "Large or complex item": "custom"
    }
  },

  installation: {
    "AC Condenser Cleaning": {
      "Single condenser": 169,
      "Two condensers": 310,
      "Three or more condensers": "custom"
    },
    "Shelving": {
      "Standard install": 125,
      "Multiple shelves or complex layout": "custom"
    },
    "Curtains / Blinds": {
      "Standard install": 125,
      "Multiple windows": "custom"
    },
    "Sprinkler Controller": {
      "Replace existing controller": 175
    },
   "Sprinkler Repair": {
    "Sprinkler head replacement": 125,
    "Sprinkler head adjustment / raise": 125,
    "Leaking sprinkler head replacement": 125,
    "Exposed sprinkler pipe repair": 175
    },
    "General Maintenance": {
      "Small task": 125,
      "Hourly work": "hourly"
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
    const opt = document.createElement("option");
    opt.value = sub;
    opt.textContent = sub;
    subEl.appendChild(opt);
  });
}

function loadDetails(category, sub) {
  resetDropdown(detailEl, "Select Option");

  if (!data[category] || !data[category][sub]) return;

  Object.keys(data[category][sub]).forEach(detail => {
    const opt = document.createElement("option");
    opt.value = detail;
    opt.textContent = detail;
    detailEl.appendChild(opt);
  });
}

categoryEl.addEventListener("change", () => {
  loadSubcategories(categoryEl.value);
  resultEl.innerHTML = "";
});

subEl.addEventListener("change", () => {
  loadDetails(categoryEl.value, subEl.value);
  resultEl.innerHTML = "";
});

detailEl.addEventListener("change", () => {
  resultEl.innerHTML = "";
});

function generateQuote() {
  const cat = categoryEl.value;
  const sub = subEl.value;
  const det = detailEl.value;
  const materials = document.getElementById("materials").value;

  if (!cat || !sub || !det) {
    resultEl.innerHTML = "Please complete all quote selections.";
    return;
  }

  const price = data[cat][sub][det];
  let message = "";

  if (price === "custom") {
    message = "This service needs a quick review before pricing. Submit the request below with details and photos, and we’ll follow up with a clear estimate.";
  } else if (price === "hourly") {
    message = "Estimated labor: $85/hr with a $125 minimum service call.";
  } else if (price === "custom_outlet_6_15") {
    message = "Estimated labor: $125 minimum plus $8 per outlet/switch for 6–15 standard replacements.";
  } else if (price === "custom_outlet_16_30") {
    message = "Estimated labor: $125 minimum plus $7 per outlet/switch for 16–30 standard replacements.";
  } else if (price === "custom_outlet_30_plus") {
    message = "Estimated labor: $125 minimum plus $6 per outlet/switch for 30+ standard replacements.";
  } else {
    message = `Estimated labor: $${price}.`;
  }

  if (sub === "Outlet / Switch") {
    message += " Standard pricing assumes existing boxes and wiring are usable. Damaged boxes, unsafe wiring, burned connections, loose wiring, or other pre-existing issues will be reviewed before additional work is performed. Small corrective repairs may add $25+ depending on condition.";
  }

  if (sub === "EV Charger Outlet" && det === "Inspection only") {
  message += " Inspection includes a basic visual review of the existing outlet/setup. If additional service is needed, the work will be reviewed and quoted before anything is performed.";
  }

if (sub === "EV Charger Outlet" && det === "Standard install within 5 ft") {
  message += " Standard install includes a straightforward outlet installation within 5 feet of the panel. Longer distance or added complexity is reviewed before work begins.";
  }

  if (sub === "Shower Cartridge") {
    message += " Some cartridges may be stuck, damaged, or require additional valve work. Any added work is reviewed before continuing.";
  }

  if (sub === "Garbage Disposal") {
    message += " Electrical, plumbing, or cabinet modifications are quoted separately. Add-ons are usually handled in $50 increments when simple.";
  }

  if (sub === "AC Condenser Cleaning") {
    message += " Includes outdoor condenser cleaning, debris removal, and basic visual check.";
  }

  if (sub === "Sprinkler Controller") {
    message += " Includes replacement using existing wiring and basic zone setup/testing. Existing wiring, valves, solenoids, zones, and irrigation components must be functional. If the system cannot be tested before replacement, ProFix is not responsible for pre-existing sprinkler issues discovered after controller replacement.";
  }

  if (sub === "Sprinkler Repair") {
  message += " Pricing includes the minimum service call. Additional sprinkler heads are typically $75 each. Exposed pipe repair starts at $175 depending on access and condition. If additional issues are found, they will be reviewed and quoted for approval before work is performed.";
  }

  if (materials === "profix") {
    message += " Materials are priced separately.";
  }

  message += "<br><br><strong>Next step:</strong> Submit the form below with photos/details so we can confirm scope and schedule.";

  resultEl.innerHTML = message;
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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  btn.style.display = window.scrollY > 500 ? "block" : "none";
});
