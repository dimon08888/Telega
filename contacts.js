import db from "./db.js";

let contactsCopy = db.contacts.slice();

const padZero = (number) => String(number).padStart(2, "0");

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
  const contactsList = $(".contacts");
  contactsList.innerHTML = "";
  for (let contact of contacts) {
    contactsList.innerHTML += renderContact(contact);
  }
}

export default function render() {
  $("main").innerHTML = `
     <header>
        <span style="flex: 0 0 10%"></span>
        <h3>Contacts</h3>
        <button class="transparent-btn" style="flex: 0 0 10%">
        <a href="/add-contact">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </a>
        </button>
      </header>
      <div class="search">
        <input id="searchRandom" type="text" placeholder="Search...">
      </div>
      <div class="sort-by">
        <select name="" id="sort-by">
          <option value="name">Sorted by Name</option>
          <option value="status">Sorted by Status</option>
        </select>
      </div>
      <ul class="contacts">
      </ul>
  `;

  sortByName(contactsCopy);
  renderContacts(contactsCopy);

  const inputText = $("#searchRandom");

  inputText.addEventListener("input", () => {
    const name = inputText.value.toLowerCase();
    const filtered = contactsCopy.filter((el) =>
      el.name.toLowerCase().includes(name)
    );
    renderContacts(filtered);
  });

  const sortBy = $("#sort-by");

  sortBy.addEventListener("change", () => {
    if (sortBy.value === "status") {
      sortByStatus(contactsCopy);
      renderContacts(
        contactsCopy.filter((contact) =>
          contact.name.match(new RegExp(inputText.value, "i"))
        )
      );
    } else if (sortBy.value === "name") {
      sortByName(contactsCopy);
      renderContacts(
        contactsCopy.filter((contact) =>
          contact.name.match(new RegExp(inputText.value, "i"))
        )
      );
    }
  });
}

// function substr(s1, s2) {
//   let p1 = 0;
//   let p2 = 0;

//   while (p1 < s1.length) {
//     if (s1[p1] === s2[p2]) {
//       while (p1 < s1.length && p2 < s2.length && s1[p1] === s2[p2]) {
//         p1++;
//         p2++;
//       }

//       if (p2 === s2.length) {
//         return true;
//       } else {
//         p2 = 0;
//       }
//     } else {
//       p1++;
//     }
//   }

//   return false;
// }

// console.log(substr("John Doe", "ohnq"));
