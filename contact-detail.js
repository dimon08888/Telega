import db from "./db.js";

export default function renderContactDetail(redirect, state = undefined) {
  //   const person = console.log();
  //   console.log(person);
  // perosn.name person.phone person.lastSeenAT.
  $("main").innerHTML = `<h1>Contact-detail for ${state.id}</h1>`;
}
