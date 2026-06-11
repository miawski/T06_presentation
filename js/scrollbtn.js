const scrollTargets = Array.from(
  document.querySelectorAll(
    "main > .hero-section, main > .portfolio_hero, main > .frontpage_theme_btns, main > section.Tema_oversigt > .portfolio_content > div, main > div.Tema_oversigt > .portfolio_content > .theme_info, main > div.Tema_oversigt > .portfolio_content > .general_theme, main > div.Tema_oversigt > .portfolio_content > .preview_div, footer",
  ),
).filter((target) => target.offsetHeight > 0);

if (scrollTargets.length > 1) {
  const scrollButton = document.createElement("button");

  scrollButton.type = "button";
  scrollButton.className = "scroll_btn";
  scrollButton.textContent = "scroll";
  scrollButton.setAttribute("aria-label", "Scroll til næste sektion");

  document.body.append(scrollButton);

  function getHeaderOffset() {
    const header = document.querySelector(".site-header");

    if (!header) {
      return 16;
    }

    return Math.ceil(header.getBoundingClientRect().height + 32);
  }

  function pageIsAtBottom() {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 16;
  }

  function getTargetTop(target) {
    return Math.max(0, target.getBoundingClientRect().top + window.scrollY - getHeaderOffset());
  }

  function getNextScrollTarget() {
    const currentScrollPosition = window.scrollY + getHeaderOffset() + 24;

    return scrollTargets.find((target) => getTargetTop(target) > currentScrollPosition);
  }

  function updateScrollButton() {
    const pageCanScroll = document.documentElement.scrollHeight > window.innerHeight + 16;

    scrollButton.hidden = !pageCanScroll;
    scrollButton.textContent = pageIsAtBottom() ? "til toppen" : "scroll";
    scrollButton.setAttribute("aria-label", pageIsAtBottom() ? "Scroll til toppen" : "Scroll til næste sektion");
  }

  scrollButton.addEventListener("click", () => {
    if (pageIsAtBottom()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const nextTarget = getNextScrollTarget();

    if (nextTarget) {
      window.scrollTo({ top: getTargetTop(nextTarget), behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  });

  window.addEventListener("scroll", updateScrollButton, { passive: true });
  window.addEventListener("resize", updateScrollButton);
  updateScrollButton();
}
