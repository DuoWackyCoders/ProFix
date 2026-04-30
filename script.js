const data = {
  electrical: {
    "Outlet / Switch": {
      "Replace existing": 125,
      "New install": "custom"
    },
    "EV Charger Outlet": {
      "Inspection": 125,
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
      "Patch": 125,
      "Medium repair": "custom"
    },
    "Doors": {
      "Alignment": 125,
      "Hardware replacement": 150
    }
  },
  assembly: {
    "Furniture": {
      "Standard": 125
    }
  },
  installation: {
    "TV Mounting": {
      "Standard": 150
    }
  }
};

const categoryEl = document.getElementById("category");
const subEl = document.getElementById("subcategory");
const detailEl = document.getElementById("details");

categoryEl.addEventListener("change", () => {
  subEl.innerHTML = "<option>Select Subcategory</option>";
  detailEl.innerHTML = "";

  let subs = data[categoryEl.value];
  for (let key in subs) {
    let opt = document.createElement("option");
    opt.value = key;
    opt.textContent = key;
    subEl.appendChild(opt);
  }
});

subEl.addEventListener("change", () => {
  detailEl.innerHTML = "<option>Select Detail</option>";

  let details = data[categoryEl.value][subEl.value];
  for (let key in details) {
    let opt = document.createElement("option");
    opt.value = key;
    opt.textContent = key;
    detailEl.appendChild(opt);
  }
});

function generateQuote() {
  let cat = categoryEl.value;
  let sub = subEl.value;
  let det = detailEl.value;
  let materials = document.getElementById("materials").value;
  let result = document.getElementById("result");

  if (!cat || !sub || !det) {
    result.innerText = "Please complete all selections.";
    return;
  }

  let price = data[cat][sub][det];

  if (price === "custom") {
    result.innerText = "This job requires a custom quote. Please submit the form below and we will follow up.";
    return;
  }

  let finalPrice = price;


  if (materials === "profix") {
    result.innerText = "Estimated Labor: $" + finalPrice + ". Materials are billed separately based on project requirements.";
  } else {
    result.innerText = "Estimated Labor: $" + finalPrice + " (customer supplies materials)";
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const btn = document.getElementById("darkToggle");

  if (document.body.classList.contains("dark")) {
    btn.innerText = "☀️";
  } else {
    btn.innerText = "🌙";
  }
}

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      sec.classList.add("show");
    }
  });
});

window.dispatchEvent(new Event("scroll"));


const reviewContainer = document.querySelector(".review-grid");

let scrollAmount = 0;

setInterval(() => {
  if (reviewContainer) {
    scrollAmount += 1;
    reviewContainer.scrollLeft = scrollAmount;

    if (scrollAmount >= reviewContainer.scrollWidth) {
      scrollAmount = 0;
    }
  }
}, 50);

