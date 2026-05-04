// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");



function getCart() {
  const data = sessionStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}


function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}



function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button data-id="${product.id}">Add to Cart</button>
    `;

    productList.appendChild(li);
  });
}



function renderCart() {
  const cart = getCart();

  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}



function addToCart(productId) {
  const cart = getCart(); // ALWAYS get existing cart first

  const product = products.find((p) => p.id === productId);

  cart.push(product); // allow duplicates

  saveCart(cart); // save full updated cart

  renderCart();
}



function clearCart() {
  sessionStorage.removeItem("cart"); // only place where cart resets
  renderCart();
}


productList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const productId = parseInt(e.target.getAttribute("data-id"));
    addToCart(productId);
  }
});



clearCartBtn.addEventListener("click", clearCart);


renderProducts();
renderCart();
