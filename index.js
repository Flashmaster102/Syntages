const insertRecipe = document.querySelector("#insertRecipe");
const insertIngredient = document.querySelector("#insertIngredient");
const name = document.querySelector("#name");
const quantity = document.querySelector("#quantity");
const price = document.querySelector("#price");
const tax = document.querySelector("#tax");
const product = document.querySelector("#product");
const oneIngredient = document.querySelector("#oneIngredient");
const ingredientsList = document.querySelector("#ingredientsList");
const msg = document.querySelector("span");
const ingredients = [],
  selection = [],
  quantities = [],
  prices = [],
  taxes = [],
  total = [];

const displayIngredient = () => {
  let listing = "";
  if (ingredients.length == 0) {
    msg.style.visibility = "visible";
    product.style.visibility = "hidden";
    oneIngredient.innerHTML = "Δεν υπάρχουν υλικά!";
  } else {
    msg.style.visibility = "hidden";
    listing += "<table>";
    listing += "<tr><th>Υλικό</th><th>Τιμή (kg)</th><th>ΦΠΑ</th></tr>";
    ingredients.forEach((current, index) => {
      listing += `<tr><td>${current}</td><td>${prices[index]}&euro;</td><td>${taxes[index]}&percnt;</td><td><a href="#" class="deleting">Διαγραφή!</a></td></tr>`;
    });
    listing += "</table>";
    oneIngredient.innerHTML = listing;
    const links = document.getElementsByClassName("deleting");
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", () => {
        ingredients.splice(i, 1);
        quantities.splice(i, 1);
        prices.splice(i, 1);
        taxes.splice(i, 1);
        total.splice(i, 1);
        displayIngredient();
      });
    }
    let child = product.lastElementChild;
    while (child) {
      product.removeChild(child);
      child = product.lastElementChild;
    }
    for (let i = 0; i < ingredients.length; i++) {
      opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = ingredients[i];
      product.appendChild(opt);
    }
    product.style.visibility = "visible";
  }
};

insertIngredient.addEventListener("click", () => {
  let listing = "";
  if (name.value === "" || tax.value === "" || price.value === "")
    alert("Συμπληρώστε όλα τα πεδία!");
  else {
    ingredients.push(name.value);
    quantities.push(0);
    prices.push(Number(price.value));
    taxes.push(Number(tax.value));
    total.push(0);

    displayIngredient();
  }
});

const displayRecipe = () => {
  let listing = "";
  let totalWeight = 0,
    totalCost = 0;
  if (selection.length == 0) ingredientsList.innerHTML = "Δεν υπάρχουν υλικά!";
  else {
    listing += "<table>";
    listing +=
      "<tr><th>Υλικό</th><th>Βάρος(σε kg)</th><th>Τιμή χωρίς ΦΠΑ</th><th>Τιμή με ΦΠΑ</th></tr>";
    selection.forEach((current) => {
      listing += `<tr><td>${ingredients[current]}</td><td>${
        quantities[current]
      }</td><td>${currency(quantities[current]).multiply(
        prices[current]
      )}&euro;</td><td>${
        total[current]
      }&euro;</td><td><a href="#" class="deleting2">Διαγραφή!</a></td></tr>`;
      totalWeight = currency(totalWeight, { precision: 3 }).add(
        quantities[current]
      );
      totalCost = currency(totalCost, { precision: 3 }).add(total[current]);
    });
    listing += `<tr><td colspan="3">Συνολικό βάρος</td><td>${totalWeight} kg</td></tr>`;
    listing += `<tr><td colspan="3">Συνολικό κόστος</td><td>${totalCost}&euro;</td></tr>`;
    listing += "</table>";
    ingredientsList.innerHTML = listing;
    const links = document.getElementsByClassName("deleting2");
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", () => {
        selection.splice(i, 1);
        displayRecipe();
      });
    }
  }
};

insertRecipe.addEventListener("click", () => {
  let listing = "";
  let withoutTax = 0;
  if (quantity.value === "") alert("Συμπληρώστε όλα τα πεδία!");
  else if (product.style.visibility === "hidden")
    alert("Παρακαλώ εισάγετε υλικό!");
  else {
    selection.push(product.value);
    quantities[product.value] = Number(quantity.value);
    withTax = currency(Number(quantity.value)).multiply(Number(price.value));
    total[product.value] = withTax;
    withTax = currency(withTax).multiply(taxes[product.value]).divide(100);
    total[product.value] = currency(total[product.value]).add(withTax);
    displayRecipe();
  }
});
