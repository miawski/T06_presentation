const navDropdowns = document.querySelectorAll(".dropdown_wrapper");

function closeNavDropdowns(dropdownToKeepOpen) {
  navDropdowns.forEach((dropdown) => {
    if (dropdown !== dropdownToKeepOpen) {
      dropdown.removeAttribute("open");
    }
  });
}

if (navDropdowns.length > 0) {
  navDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("toggle", () => {
      if (dropdown.open) {
        closeNavDropdowns(dropdown);
      }
    });

    dropdown.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        dropdown.removeAttribute("open");
      }
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideDropdown = event.target instanceof Element && event.target.closest(".dropdown_wrapper");

    if (!clickedInsideDropdown) {
      closeNavDropdowns();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavDropdowns();
    }
  });
}
