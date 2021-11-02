export const print = async ({
  targetElement,
  before,
  after,
  autoClose = true,
}) => {
  const elem = targetElement.cloneNode(true);
  elem.style.opacity = 1;
  elem.style.visibility = "visible";

  let styleSheets = Array(
    ...document.querySelectorAll('style, link[rel="stylesheet"]')
  );

  var win = window.open("", "");
  win.document.write("<html><body>");
  win.document.write("</body></html>");
  styleSheets.forEach(style =>
    win.document.querySelector("head").append(style.cloneNode(true))
  );
  win.document.body.append(elem.cloneNode(true));
  win.document.close();

  if (before) {
    win.onbeforeprint = before;
  }
  if (after) {
    win.onafterprint = after;
  }

  setTimeout(() => {
    win.print();
    if (autoClose) {
      win.close();
    }
  }, 100);
};
