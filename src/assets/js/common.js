document.addEventListener("DOMContentLoaded", function () {
  /* vh */
  vh();
  window.addEventListener("resize", vh);

  /* Viewport */
  if (navigator.userAgent.match(/iP(hone|od|ad)/)) {
    document
      .getElementsByName("viewport")[0]
      .setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0"
      );
  } else {
    document
      .getElementsByName("viewport")[0]
      .setAttribute("content", "width=device-width, initial-scale=1.0");
  }

  /* isMobile */
  if (
    navigator.userAgent.match(
      /Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
    )
  ) {
    document.querySelector("body").classList.add("isMobile");
  } else {
    document.querySelector("body").classList.add("isPc");
  }
});

function vh() {
  let vh = window.innerHeight * 0.01;
  document.querySelector(":root").setAttribute("style", "--vh:" + vh + "px;");
}
