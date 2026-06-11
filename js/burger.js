const mobileBurger = document.querySelector("#mobileBurger");
const mobileMenu = document.querySelector("#burgermenu");

function closeMobileMenu() {
  if (mobileBurger) {
    mobileBurger.setAttribute("aria-expanded", "false");
  }
}

if (mobileBurger && mobileMenu) {
  mobileBurger.addEventListener("click", () => {
    const menuIsOpen = mobileBurger.getAttribute("aria-expanded") === "true";

    mobileBurger.setAttribute("aria-expanded", String(!menuIsOpen));
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}
