import 'picturefill';
import 'details-element-polyfill';
import Nav from './components/nav';

const work = () => {
  const navElem = document.querySelector(`.main-nav`);

  if (navElem !== null) {
    new Nav(navElem);
  }
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
