import db from "./db.js";

export default function renderAddContact() {
  // TODO: do not use html validation, because it is not customizable.
  $("main").innerHTML = `
  <form class="form">
  <div class ="form__title">Create Contact</div>
  <div class="form__group">
    <input required class="form__input" placeholder="Name" name="name">
  </div>
  <div>
    <input required pattern="\\d-\\d{3}-\\d{3}-\\d{2}-\\d{2}" class="form__input" placeholder="Phone Number" name="phone">
  </div>
   <button class="form__button">PUSH</button>
  </form>
`;

  // TODO: validate with javascript phone and name and display errors in the DOM.
  $(".form").addEventListener("submit", (e) => {
    e.preventDefault(); // do not reload the page.
    const { name, phone } = e.target.elements;
    db.contacts.push({
      name: name.value,
      phone: phone.value,
      status: "Online",
    });
  });
}
