const contacts = [
  {
    name: "John Doe",
    status: "Last seen just now",
  },
  {
    name: "Alice Johnson",
    status: "Online",
  },
  {
    name: "Alice Alison",
    status: "Online",
  },
  {
    name: "Alice Bobson",
    status: "Online",
  },
  {
    name: "Bob Martin",
    status: "Last seen just now",
  },
  {
    name: "Denis Albus",
    status: "Online",
  },
  {
    name: "Gary Vee",
    status: "Last seen just now",
  },
  {
    name: "Denis Kruger",
    status: "Last seen just now",
  },
  {
    name: "Linus Torwalds",
    status: "Last seen 22 minutes ago",
  },
  {
    name: "Will Smith",
    status: "Last seen 7 hours ago",
  },
  {
    name: "Arnold Schwarzenegger",
    status: "Last seen 10 minutes ago",
  },
];

function renderContact(contact) {
  return `
    <li class="contact">
      <span class="circle"></span>
      <div>
        <b>${contact.name}</b>
        <br>
        <small ${
          contact.status === "Online"
            ? 'style="color: var(--color-active)"'
            : ""
        }>${contact.status}</small>
      </div>
    </li>
  `;
}

// TODO(*): sort exactly like in telegram.
function sort(contacts) {
  function compare(contact1, contact2) {
    const name1 = contact1.name.toLowerCase();
    const name2 = contact2.name.toLowerCase();

    const [firstName1, lastName1] = name1.split(/\s+/);
    const [firstName2, lastName2] = name2.split(/\s+/);

    if (firstName1 < firstName2) {
      return -1;
    }

    if (firstName1 > firstName2) {
      return 1;
    }

    if (lastName1 < lastName2) {
      return -1;
    }

    if (lastName1 > lastName2) {
      return 1;
    }

    return 0;
  }
  return contacts.sort(compare);
}

function render() {
  const contactsList = document.querySelector(".contacts");
  sort(contacts);

  const sortBy = document.querySelector("#sort-by");
  sortBy.addEventListener("change", () => {
    if (sortBy.value === "status") {
      // TODO:
      // sort by status...
      console.log("updating ui"); // update ui
    } else if (sortBy.value === "name") {
      // TODO:
      sort(contacts);
      console.log("updating ui");
    }
  });

  for (let contact of contacts) {
    contactsList.innerHTML += renderContact(contact);
  }

  const buttons = document.querySelectorAll(".transparent-btn");

  for (const button of buttons) {
    button.addEventListener("click", () => {
      for (const otherButton of buttons) {
        otherButton.classList.remove("active");
      }
      button.classList.add("active");
    });
  }
}

render();
