const routes = {
  "/": () => import("./contacts.js"),
  "/calls": () => import("./calls.js"),
  "/chats": () => import("./chats.js"),
  "/settings": () => import("./settings.js"),
  "/add-contact": () => import("./add-contact.js"),
  "/contact-detail": () => import("./contact-detail.js"),
};

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link !== null) {
    e.preventDefault(); // prevent page reload.
    redirect(link.pathname, link.dataset.state);
  }
});

window.onpopstate = () => {
  renderPage(window.location.pathname);
};

function redirect(pathname, state = undefined) {
  window.history.pushState({}, "", pathname);
  renderPage(pathname, state);
}

function renderPage(pathname, state = undefined) {
  const pageFunc = routes[pathname];

  if (!pageFunc) {
    return;
  }

  const promise = pageFunc();
  promise.then(({ default: renderFunc }) => {
    if (typeof renderFunc === "undefined") {
      throw new Error("Page must export default a render function.");
    }
    renderFunc(redirect, state ? JSON.parse(state) : undefined);
  });

  const links = $$("a");
  links.forEach((link) => {
    if (link.pathname === pathname) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// function getRoute(pathname) {
//   // pathname -> /contact-detail/4
//   console.log(pathname);

//   for (const route in routes) {
//     const routeParts = route.split("/");
//     const pathnameParts = pathname.split("/");

//     if (routeParts.length === pathnameParts.length) {
//       // each part except part that starts with : should be equal.
//       let match = true;

//       for (let i = 0; i < routeParts.length; i++) {
//         if (routeParts[i][0] !== ":" && routeParts[i] !== pathnameParts[i]) {
//           match = false;
//           break;
//         }
//       }

//       if (match) {
//         return routes[route];
//       }
//       //
//     }
//   }

//   throw new Error("Unknown route: " + pathname);
// }

renderPage(window.location.pathname);
