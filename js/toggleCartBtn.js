const cart = document.getElementById("shoppingCart");
const openBtn = document.getElementById("openCartIcon");
const closeBtn = document.getElementById("closeCartIcon");

openBtn.addEventListener("click", () => {
  cart.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  cart.classList.add("hidden");
});
