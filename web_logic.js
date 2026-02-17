let products = document.getElementById("products_container");
let productContainer = document.querySelector(".product_container");
let menuset = "";

let html = "";
var uniqueval = new Set();
var menudiv = null;

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      html += `
        <div class="products">
          <img src="${item.image}" alt="product image">
          <p class="price">₹${Math.round(item.price * 8)}</p>
          <button class="order-btn" onclick="nextpage()">ORDER NOW</button>
        </div>
      `;

      uniqueval.add(item.category);
    });

    products.innerHTML = html;
  });
// ----------------------------------

function nextpage() {
  window.location.href = "orderpage.html";
}

function menuinsert() {
  if (menudiv) {
    menudiv.remove();
    menudiv = null;
    productContainer.style.gridTemplateColumns = "1fr";
  } else {
    menudiv = document.createElement("div");
    menudiv.className = "menu";
    uniqueval.forEach(function (univales) {
      menuset += `<li>${univales}</li>`;
    });
    menudiv.innerHTML = menuset;
  }
  productContainer.insertBefore(menudiv, products);
  productContainer.style.gridTemplateColumns = "250px 1fr";
  uniqueval.clear();
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // check if product already exists
  let existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: Math.round(product.price * 8),
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // redirect to order page
  window.location.href = "orderpage.html";
}
