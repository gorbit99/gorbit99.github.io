/** @type HTMLHeadingElement[]*/
const headers = document
  .querySelectorAll("h1, h2, h3, h4, h5, h6")
  .entries()
  .map((x) => x[1]);

for (const header of headers) {
  const id = header.textContent
    .trim()
    .replaceAll(/["',:]/g, "")
    .toLowerCase()
    .replaceAll(/\s/g, "-");

  /** @type HTMLAnchorElement */
  const anchorElement = document.createElement("a");
  anchorElement.id = id;
  anchorElement.href = `#${id}`;
  header.parentElement.replaceChild(anchorElement, header);
  anchorElement.appendChild(header);
}
