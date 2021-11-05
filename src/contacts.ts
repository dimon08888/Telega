import db from './db.js';
import { Contact } from './types';

const padZero = (n: number) => String(n).padStart(2, '0');

const getText = (singular: string, plural: string, n: number) =>
  n === 1 ? singular : plural;

function dateFromNow(dateString: string) {
  const dateNow = new Date();
  const date = new Date(dateString);

  const diffMinutes = Math.floor((dateNow.getTime() - date.getTime()) / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffMinutes < 5) {
    return 'just now';
  }

  if (diffHours < 1) {
    return `${diffMinutes} ${getText('minute', 'minutes', diffMinutes)} ago`;
  }

  if (diffHours < dateNow.getHours()) {
    return `${diffHours} ${getText('hour', 'hours', diffHours)} ago`;
  }

  if (diffHours < 24 + dateNow.getHours()) {
    return `yesterday at ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
  }

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return [day, month, year].join('-');
}

function sortByName(contacts: Contact[]) {
  function compare(contact1: Contact, contact2: Contact) {
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

function sortByStatus(contacts: Contact[]) {
  function compare(contact1: Contact, contact2: Contact) {
    const isOnline1 = contact1.lastSeenAt === null;
    const isOnline2 = contact2.lastSeenAt === null;

    if (isOnline1 && isOnline2) {
      return -1;
    }

    if (isOnline1 && !isOnline2) {
      return -1;
    }

    if (isOnline2 && !isOnline1) {
      return 1;
    }

    return (
      new Date(contact2.lastSeenAt as string).getTime() -
      new Date(contact1.lastSeenAt as string).getTime()
    );
  }
  return contacts.sort(compare);
}

function renderContact(contact: Contact) {
  const status =
    contact.lastSeenAt === null
      ? 'Online'
      : `Last seen ${dateFromNow(contact.lastSeenAt)}`;
  return `
    <li class="contact">
      <span class="circle"></span>
      <a href= "/contact-detail" data-state='${JSON.stringify({
        id: contact.id,
      })}'>
        <b>${contact.name}</b>
        <br>
        <small ${
          status === 'Online' ? 'style="color: var(--color-active)"' : ''
        }>${status}</small>
      </a>
    </li>
  `;
}

function renderContacts(contacts: Contact[]) {
  const contactsList = $('.contacts') as HTMLElement;
  contactsList.innerHTML = '';
  for (let contact of contacts) {
    contactsList.innerHTML += renderContact(contact);
  }
}

// [1, 2, 3, 4,]
// []

// [{ name: 'dasn' }, {}, {}, {}]

// [{ name: 'dasn' }. {}. {}. {}]

export default function render() {
  const contactsCopy = [...db.contacts]; // db.contacts.slice() -> makes shallow copy.

  ($('main') as HTMLElement).innerHTML = `
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

  const inputText = $('#searchRandom') as HTMLInputElement;

  inputText.addEventListener('input', () => {
    const name = inputText.value.toLowerCase();
    const filtered = contactsCopy.filter((el) => el.name.toLowerCase().includes(name));
    renderContacts(filtered);
  });

  const sortBy = $('#sort-by') as HTMLInputElement;

  sortBy.addEventListener('change', () => {
    if (sortBy.value === 'status') {
      sortByStatus(contactsCopy);
      renderContacts(
        contactsCopy.filter((contact) =>
          contact.name.match(new RegExp(inputText.value, 'i')),
        ),
      );
    } else if (sortBy.value === 'name') {
      sortByName(contactsCopy);
      renderContacts(
        contactsCopy.filter((contact) =>
          contact.name.match(new RegExp(inputText.value, 'i')),
        ),
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
