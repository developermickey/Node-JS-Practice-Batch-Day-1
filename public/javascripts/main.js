const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.remove("hidden");
});

menuClose.addEventListener("click", () => {
  menu.classList.add("hidden");
});
