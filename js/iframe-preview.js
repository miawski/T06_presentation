const previewFigures = document.querySelectorAll(".portfolio_content figure");

function deactivatePreview(figure) {
  const iframe = figure.querySelector("iframe");

  if (!iframe) {
    return;
  }

  figure.classList.remove("is_preview_active");
  iframe.style.pointerEvents = "none";
  iframe.setAttribute("scrolling", "no");
}

function loadPreviewIframe(iframe) {
  const previewSrc = iframe.dataset.src;

  if (previewSrc && !iframe.getAttribute("src")) {
    iframe.setAttribute("src", previewSrc);
    iframe.removeAttribute("srcdoc");
  }
}

previewFigures.forEach((figure) => {
  const iframe = figure.querySelector("iframe");

  if (!iframe) {
    return;
  }

  iframe.style.pointerEvents = "none";
  iframe.setAttribute("scrolling", "no");

  figure.addEventListener("click", () => {
    loadPreviewIframe(iframe);
    figure.classList.add("is_preview_active");
    iframe.style.pointerEvents = "auto";
    iframe.setAttribute("scrolling", "yes");
  });

  figure.addEventListener("mouseleave", () => {
    deactivatePreview(figure);
  });
});

document.addEventListener("mousemove", (event) => {
  const activeFigure = document.querySelector(".portfolio_content figure.is_preview_active");

  if (!activeFigure) {
    return;
  }

  const rect = activeFigure.getBoundingClientRect();

  const mouseIsOutside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;

  if (mouseIsOutside) {
    deactivatePreview(activeFigure);
  }
});
