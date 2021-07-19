const routes = {
  "/": () => import("./contacts.js"),
  "/calls": () => import("./calls.js"),
  "/chats": () => import("./chats.js"),
  "/settings": () => import("./settings.js"),
  "/add-contact": () => import("./add-contact.js"),
};

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link !== null) {
    e.preventDefault();
    window.history.pushState({}, "", link.pathname);
    renderPage(link.pathname);
  }
});

window.onpopstate = () => {
  renderPage(window.location.pathname);
};

function renderPage(pathname) {
  const pageFunc = routes[pathname];
  if (!pageFunc) {
    return;
  }

  const links = $$("a");
  links.forEach((link) => {
    if (link.pathname === pathname) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  pageFunc().then(({ default: renderFunc }) => renderFunc());
}

renderPage(window.location.pathname);
