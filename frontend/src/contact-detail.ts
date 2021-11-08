import { RenderFunc } from './index';

const renderContactDetail: RenderFunc = (redirect, state = undefined) => {
  //   const person = console.log();
  //   console.log(person);
  // perosn.name person.phone person.lastSeenAT.
  ($('main') as HTMLElement).innerHTML = `<h1>Contact-detail for ${state.id}</h1>`;
};

export default renderContactDetail;
