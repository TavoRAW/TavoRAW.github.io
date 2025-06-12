const products = [
  { id: 1, name: "Jordan 4 Retro White Cement (2025)", price: 151, image: "assets/img/shoe1.jpg" },
  { id: 2, name: "Jordan 1 Retro High OG SP Union LA", price: 155, image: "assets/img/shoe2.jpg" },
  { id: 3, name: "Jordan 11 Retro Low Bred (2025)", price: 94, image: "assets/img/shoe3.jpg" },
  { id: 4, name: "Jordan Jumpman Jack TR Cactus", price: 157, image: "assets/img/shoe4.jpg" }
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
const cartProductsText = document.getElementById("cart-products");
const buyNowBtn = document.querySelector(".buy-now");

let cart = [];

function renderProducts() {
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let productNames = [];

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `<p>${item.name} - $${item.price}</p>`;
    cartItems.appendChild(itemDiv);
    total += item.price;
    productNames.push(item.name.split(" ")[0]); // nombre corto
  });

  totalDisplay.innerText = total;
  cartProductsText.innerText = "Products: " + productNames.join(" - ");
}

buyNowBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("¡Tu carrito está vacío!");
    return;
  }

  const confirmMessage = document.createElement("div");
  confirmMessage.textContent = "✅ ¡Compra realizada con éxito!";
  confirmMessage.style.background = "#28a745";
  confirmMessage.style.color = "white";
  confirmMessage.style.padding = "1em";
  confirmMessage.style.marginTop = "1em";
  confirmMessage.style.borderRadius = "5px";
  confirmMessage.style.textAlign = "center";
  document.querySelector(".cart").appendChild(confirmMessage);

  setTimeout(() => {
    confirmMessage.remove();
    cart = [];
    updateCart();
  }, 3000);
});


const track = document.querySelector(".carousel-track");
const leftBtn = document.querySelector(".carousel-btn.left");
const rightBtn = document.querySelector(".carousel-btn.right");

let position = 0;

rightBtn.addEventListener("click", () => {
  position = (position - 100) % (100 * track.children.length);
  track.style.transform = `translateX(${position}%)`;
});

leftBtn.addEventListener("click", () => {
  position = (position + 100) % (100 * track.children.length);
  track.style.transform = `translateX(${position}%)`;
});

renderProducts();
