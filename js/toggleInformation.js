const info = document.getElementById("infoBlock");
const toggleBtn = document.getElementById("openInfoIcon");

toggleBtn.addEventListener("click", () => {
  info.classList.toggle("hidden");
});
