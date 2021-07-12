const contactsInitial = [
  {
    name: "John Doe",
    lastSeenAt: "2021-06-09T19:07:42",
  },
  {
    name: "Alice Johnson",
    lastSeenAt: null,
  },
  {
    name: "Alice Alison",
    lastSeenAt: null,
  },
  {
    name: "Alice Bobson",
    lastSeenAt: null,
  },
  {
    name: "Bob Martin",
    lastSeenAt: "2021-07-09T19:07:42",
  },
  {
    name: "Denis Albus",
    lastSeenAt: null,
  },
  {
    name: "Gary Vee",
    lastSeenAt: "2021-07-11T05:57:42",
  },
  {
    name: "Bob Marley",
    lastSeenAt: "2021-07-11T12:57:42",
  },
  {
    name: "Denis Kruger",
    lastSeenAt: "2021-07-12T12:30:45",
  },
  {
    name: "Linus Torwalds",
    lastSeenAt: "2021-07-12T12:08:45",
  },
  {
    name: "Bella Underground",
    lastSeenAt: "2021-07-12T10:08:45",
  },
  {
    name: "Will Smith",
    lastSeenAt: null,
  },
  {
    name: "Arnold Schwarzenegger",
    lastSeenAt: "2021-07-05T10:20:42",
  },
];

let contactsCopy = contactsInitial.slice();
const contactsList = document.querySelector(".contacts");

const padZero = (number) => (number < 10 ? "0" + number : number);

const getText = (singular, plural, number) =>
  number === 1 ? singular : plural;

function dateFromNow(dateString) {
  const dateNow = new Date();
  const date = new Date(dateString);

  const diffMinutes = Math.floor((dateNow - date) / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffMinutes < 5) {
    return "just now";
  }

  if (diffHours < 1) {
    return `${diffMinutes} ${getText("minute", "minutes", diffMinutes)} ago`;
  }

  if (diffHours < dateNow.getHours()) {
    return `${diffHours} ${getText("hour", "hours", diffHours)} ago`;
  }

  if (diffHours < 24 + dateNow.getHours()) {
    return `yesterday at ${padZero(date.getHours())}:${padZero(
      date.getMinutes()
    )}`;
  }

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return [day, month, year].join("-");
}

function renderContact(contact) {
  const status =
    contact.lastSeenAt === null
      ? "Online"
      : `Last seen ${dateFromNow(contact.lastSeenAt)}`;
  return `
    <li class="contact">
      <span class="circle"></span>
      <div>
        <b>${contact.name}</b>
        <br>
        <small ${
          status === "Online" ? 'style="color: var(--color-active)"' : ""
        }>${status}</small>
      </div>
    </li>
  `;
}

function renderContacts(contacts) {
  contactsList.innerHTML = "";
  for (let contact of contacts) {
    contactsList.innerHTML += renderContact(contact);
  }
}

// TODO(*): sort exactly like in telegram.
function sortByName(contacts) {
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

function sortByStatus(contacts) {
  function compare(contact1, contact2) {
    const isOnline1 = contact1.lastSeenAt === null;
    const isOnline2 = contact2.lastSeenAt === null;

    if (isOnline1 && !isOnline2) {
      return -1;
    }

    if (isOnline2 && !isOnline1) {
      return 1;
    }

    return new Date(contact2.lastSeenAt) - new Date(contact1.lastSeenAt);
  }
  return contacts.sort(compare);
}

// todo: implement search/filter.
function render() {
  sortByName(contactsCopy);
  renderContacts(contactsCopy);

  const sortBy = document.querySelector("#sort-by");

  sortBy.addEventListener("change", () => {
    if (sortBy.value === "status") {
      sortByStatus(contactsCopy);
      renderContacts(contactsCopy);
    } else if (sortBy.value === "name") {
      sortByName(contactsCopy);
      renderContacts(contactsCopy);
    }
  });

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
