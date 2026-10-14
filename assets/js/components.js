document.querySelectorAll("[data-component]").forEach(component => {
  const name = component.dataset.component;
  const request = new XMLHttpRequest();

  request.open("GET", `components/${name}.html`, false);
  request.send();

  if (request.status >= 200 && request.status < 300) {
    component.outerHTML = request.responseText;
  } else {
    throw new Error(`Unable to load component: ${name}`);
  }
});