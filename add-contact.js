import db from "./db.js";

export default function renderAddContact(redirect) {
  // TODO: do not use html validation, because it is not customizable.
  $("main").innerHTML = `
  <form class="form" autocomplete ="off">

  <div class ="form__title">Create Contact</div>

  <div class="form__group">
    <input class="form__input" placeholder="Name" name="name" id= "name">
    <div class = "form__control">
      <i class="fa fa-check-circle" aria-hidden="true"></i>
    </div>
  </div>
   
  <div class="form__group">
    <input class="form__input" placeholder="Phone Number" name="phone" id="phoneNumber">
   <div class = "form__control">
      <i class="fa fa-check-circle" aria-hidden="true"></i>
    </div>
  </div>
  
   <button type="submit" class="form__button">PUSH</button>

  </form>
`;

  // $("#phoneNumber").addEventListener("input", (e) => {
  //   const { value } = e.target;

  //   if (value != Number(value)) {
  //     e.target.value = "";
  //   }
  // });

  $("#phoneNumber").addEventListener("keydown", (e) => {
    if (isNaN(e.key) && e.key !== "Backspace") {
      e.preventDefault(); // do not save value in input.
    }
  });

  $(".form").addEventListener("submit", (e) => {
    e.preventDefault(); // do not reload the page.
    const { name, phone } = e.target.elements;
    let ok = true;

    function success(inputEl) {
      inputEl.style.borderBottomColor = "green";
      const parent = inputEl.closest(".form__group");
      const control = parent.querySelector(".form__control");
      control.style.visibility = "visible";
      control.style.color = "green";
    }

    function error(inputEl) {
      ok = false;
      inputEl.style.borderBottomColor = "red";
      const parent = inputEl.closest(".form__group");
      const control = parent.querySelector(".form__control");
      control.style.visibility = "visible";
      control.style.color = "red";
    }

    if (name.value.trim() === "") {
      error(name);
    } else {
      success(name);
    }

    if (phone.value.trim() === "") {
      error(phone);
    } else {
      success(phone);
    }

    if (ok) {
      db.contacts.push({
        name: name.value,
        phone: phone.value,
        lastSeenAt: null,
      });
      // add contact
      redirect("/");
    }
  });
}

// 1. every time user pressed a key inside phone input element.
// 2. check this key
// 3. if this key is not a digit -> erase it.

// when does user press a key?
// how to run code when user presses a key inside input element?
