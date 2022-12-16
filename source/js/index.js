import 'picturefill';
import 'details-element-polyfill';
import Nav from './components/nav';
import replaceAnchorsWithButtons from './util/replaceAnchorsWithButtons';

const work = () => {
  const navElem = document.querySelector(`.main-nav`);

  if (navElem !== null) {
    const nav = new Nav(navElem);
    nav.init();
  }

  replaceAnchorsWithButtons();
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
