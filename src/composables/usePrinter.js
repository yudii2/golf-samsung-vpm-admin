export const print = async ({
  targetElement,
  before,
  after,
  autoClose = true,
  useGrid = false,
}) => {
  const elem = targetElement.cloneNode(true);
  elem.style.opacity = 1;
  elem.style.visibility = "visible";
  elem.style.display = useGrid ? "grid" : "block";

  let styleSheets = Array(
    ...document.querySelectorAll('style, link[rel="stylesheet"]')
  );

  var win = window.open("", "");
  win.document.write("<svgs><body>");
  win.document.write("</body></svgs>");
  styleSheets.forEach((style) =>
    win.document.querySelector("head").append(style.cloneNode(true))
  );
  win.document.body.append(elem.cloneNode(true));
  win.document.close();

  if (before && typeof before === "function") {
    win.onbeforeprint = before;
  }
  if (after && typeof after === "function") {
    win.onafterprint = after;
  }

  setTimeout(() => {
    win.print();
    if (autoClose) {
      win.close();
    }
  }, 100);
};
