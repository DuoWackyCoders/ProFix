const subcategories = {
  electrical: ["Outlet Repair", "EV Charger Install"],
  plumbing: ["Faucet Repair", "Toilet Replace"]
};

document.getElementById("category").addEventListener("change", function() {
  let sub = document.getElementById("subcategory");
  sub.innerHTML = "";

  subcategories[this.value]?.forEach(item => {
    let option = document.createElement("option");
    option.text = item;
    sub.add(option);
  });
});

function generateQuote() {
  let cat = document.getElementById("category").value;
  let sub = document.getElementById("subcategory").value;
  let result = document.getElementById("result");

  if (sub === "EV Charger Install") {
    result.innerText = "Custom quote required. We will contact you.";
  } else {
    result.innerText = "Estimated: $125 - $250";
  }
}

function scrollToQuote() {
  document.getElementById("quote").scrollIntoView({ behavior: "smooth" });
}
