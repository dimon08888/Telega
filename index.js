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
    name: "Bob Martin",
    status: "Last seen just now",
  },
  {
    name: "Gary Vee",
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
    name: "Arnold Schwarzenegger ",
    status: "Last seen 10 minutes ago",
  },
];

// TODO: if user status is online -> highlight it with differnet color.
function renderContact(contact) {
  return `
    <li class="contact">
      <span class="circle"></span>
      <div>
        <b>${contact.name}</b>
        <br>
        <small>${contact.status}</small>
      </div>
    </li>
    `;
}

const contactsList = document.querySelector(".contacts");

for (let contact of contacts) {
  contactsList.innerHTML += renderContact(contact);
}
