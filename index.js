import db from "./db.js";

let contactsCopy = db.contacts.slice();
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

// db.contacts
// contactsCopy
// sort -> contactsCopy
// filter -> contactsCopy -> array
// sort -> contactsCopy

// array
// sorting.
// fintering. ->?

const inputText = document.querySelector("#searchRandom");

// todo: filter doesn't work with sort and vice verca.
inputText.addEventListener("input", () => {
  const name = inputText.value.toLowerCase();
  const filtered = db.contacts.filter((el) =>
    el.name.toLowerCase().includes(name)
  );
  renderContacts(filtered);
});

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

function render() {
  sortByName(contactsCopy);
  renderContacts(contactsCopy);

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

// Linear Search.
// function find(array, target) {
//   // for (let i = 0; i < array.length; i++) {
//   //   if (array[i] === target) {
//   //     return true;
//   //   }
//   // }

//   // for (const element of array) {
//   //   if (element === target) {
//   //     return true;
//   //   }
//   // }

//   // return false;
//   return array.some((element) => element === target);
//   // return array.includes(target);
// }

//       i
//       6
// MarginBomoBob

// j
// 0
// Bob

// console.log(substr("BobMargin", "Bob"));
// console.log(substr("MartinBob", "Bob"));
// console.log(substr("Mar Bob tin", "Bob"));

// console.log(find(["bob", "john", "alice", "elena"], "bob"));
// console.log(find(["alice", "bob", "john", "elena"], "bob"));
// console.log(find(["alice", "john", "bob", "elena"], "bob"));
// console.log(find(["alice", "john", "elena", "bob"], "bob"));
// console.log(find(["alice", "john", "elena", "denis"], "bob"));
// console.log(
//   db.contacts.some(
//     (contact) =>
//       JSON.stringify(contact) ===
//       JSON.stringify({
//         name: "Alice Bobson",
//         lastSeenAt: null,
//       })
//   )
// );
