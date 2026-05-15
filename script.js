const data = {
  electrical: {
    "Outlet / Switch": {
      "1–5 standard outlets or switches": 125,
      "6–15 outlets or switches": "custom_outlet_6_15",
      "16–30 outlets or switches": "custom_outlet_16_30",
      "30+ outlets or switches": "custom_outlet_30_plus"
    },
    "GFCI Outlet": {
    "Test / troubleshoot": 125,
    "Replace existing GFCI": 95
    },
    "Electrical Service": {
    "General electrical review": "hourly"
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
      "New install": 325,
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
      "Sprinkler head adjustment / raise / Move": 175,
      "Leaking sprinkler head replacement + repair": 195,
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
  updateHiddenQuoteFields("");
});

subEl.addEventListener("change", () => {
  loadDetails(categoryEl.value, subEl.value);
  resultEl.innerHTML = "";
  updateHiddenQuoteFields("");
});

detailEl.addEventListener("change", () => {
  resultEl.innerHTML = "";
  updateHiddenQuoteFields("");
});

function generateQuote() {
  const cat = categoryEl.value;
  const sub = subEl.value;
  const det = detailEl.value;
  const materials = document.getElementById("materials").value;

  if (!cat || !sub || !det) {
    resultEl.innerHTML = "Please complete all selections.";
    return;
  }

  const price = data[cat][sub][det];
  let message = "";

  if (price === "custom") {
    message = "This service needs a quick review before pricing. Submit details below and we’ll follow up with a clear estimate.";
  } else if (price === "hourly") {
    message = "Estimated labor: $85/hr with a $125 minimum service call.";
  } else if (price === "custom_outlet_6_15") {
    message = "Estimated labor: $125 minimum plus $8 per outlet/switch, 6–15 total.";
  } else if (price === "custom_outlet_16_30") {
    message = "Estimated labor: $125 minimum plus $7 per outlet/switch, 16–30 total.";
  } else if (price === "custom_outlet_30_plus") {
    message = "Estimated labor: $125 minimum plus $6 per outlet/switch, 30+ total.";
  } else {
    message = `Estimated labor: $${price}.`;
  }

  if (sub === "Outlet / Switch") {
    message += " Assumes existing wiring and boxes are usable. Damaged boxes, unsafe wiring, burned connections, loose wiring, or other issues may require additional cost. Any added work will be reviewed and approved before it is performed.";
  }

  if (sub === "EV Charger Outlet" && det === "Inspection only") {
    message += " Includes visual inspection and basic voltage testing of the existing outlet/setup. If service or correction is needed, a clear quote will be provided before any work is done.";
  }

  if (sub === "EV Charger Outlet" && det === "Standard install within 5 ft") {
    message += " Standard install assumes a straightforward setup within 5 feet of the panel. Added distance or complexity will be reviewed first.";
  }

  if (sub === "Garbage Disposal") {
    message += " Electrical or plumbing modifications are quoted separately.";
  }

  if (sub === "AC Condenser Cleaning") {
    message += " Includes outdoor condenser cleaning, debris removal, and a basic visual check.";
  }

  if (sub === "Sprinkler Controller") {
    message += " Includes replacement using existing wiring and basic setup. If system cannot be tested prior, pre-existing issues are not assumed as part of this service.";
  }

  if (sub === "Sprinkler Repair") {
    message += " Includes minimum service call. Additional heads are typically $95 each. Pipe repair starts at $175. Any additional issues will be reviewed before work continues.";
  }

  if (materials === "profix") {
    message += " Materials are priced separately.";
  }

  const cleanMessage = message.replace(/<br>/g, " ").replace(/<[^>]*>/g, "");

  message += `
    <br><br>
    <strong>Next step:</strong> Submit your request below with your preferred timing.
    <br>
    Photos are helpful. After submitting, you can reply to our email with photos of the work area.
    <br>
    We’ll review the request and confirm availability before scheduling.
  `;

  resultEl.innerHTML = message;
  updateHiddenQuoteFields(cleanMessage);
}

function updateHiddenQuoteFields(estimateText) {
  const categoryText = categoryEl.options[categoryEl.selectedIndex]?.text || "";
  const subcategoryText = subEl.value || "";
  const detailText = detailEl.value || "";
  const materialsText = document.getElementById("materials")?.selectedOptions[0]?.text || "";

  document.getElementById("selectedCategory").value = categoryText;
  document.getElementById("selectedService").value = subcategoryText;
  document.getElementById("selectedOption").value = detailText;
  document.getElementById("selectedMaterials").value = materialsText;
  document.getElementById("estimatedResult").value = estimateText;
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
