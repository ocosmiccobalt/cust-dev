import { checkEsc } from '../util/checkKey.js';

class Nav {
  constructor(navElem) {
    this.navElem = navElem;
    this.buttons = [
      ...this.navElem.querySelectorAll(`button[aria-controls]`)
    ];
    this.controlledElems = [];
    this.openIndex = null;
  }

  init() {
    const getNoJsClass = (elem) => {
      let noJsClass = null;

      elem.classList.forEach((item) => {
        if (item.endsWith(`--nojs`)) {
          noJsClass = item;
        }
      });

      return noJsClass;
    };

    const getOpenClass = (noJsClass) => (
      noJsClass ? `${noJsClass.slice(0, -4)}open` : null
    );

    this.navElem.classList.remove(getNoJsClass(this.navElem));

    this.buttons.forEach((btn) => {
      const menuId = btn.getAttribute(`aria-controls`);
      const menu = this.navElem.querySelector(`#${menuId}`);
      this.controlledElems.push(menu);

      if (menu !== null) {
        const btnNoJsClass = getNoJsClass(btn);
        const menuNoJsClass = getNoJsClass(menu);

        btn.openClass = getOpenClass(btnNoJsClass);
        menu.openClass = getOpenClass(menuNoJsClass);

        // collapse menus
        btn.classList.remove(btnNoJsClass);
        menu.classList.remove(menuNoJsClass);
        btn.setAttribute(`aria-expanded`, false);

        btn.addEventListener(`click`, this.onButtonClick.bind(this));
        btn.addEventListener(`keydown`, this.onButtonKeyDown.bind(this));
        menu.addEventListener(`keydown`, this.onMenuKeyDown.bind(this));
      }
    });

    this.navElem.addEventListener(`focusout`, this.onNavBlur.bind(this));
  }

  onButtonClick(evt) {
    const target = evt.currentTarget;
    const buttonIndex = this.buttons.indexOf(target);
    const buttonExpanded = target.getAttribute(`aria-expanded`) === `true`;

    // toggle on click
    this.toggleExpanded(buttonIndex, !buttonExpanded);
  }

  onButtonKeyDown(evt) {
    // close on escape
    if (checkEsc(evt)) {
      this.toggleExpanded(this.openIndex, false);
    }
  }

  onMenuKeyDown(evt) {
    if (this.openIndex === null) {
      return;
    }

    // close on escape
    if (checkEsc(evt)) {
      this.buttons[this.openIndex].focus();
      this.toggleExpanded(this.openIndex, false);
    }
  }

  onNavBlur(evt) {
    const navContainsFocus = this.navElem.contains(evt.relatedTarget);

    // close on blur
    if (!navContainsFocus && this.openIndex !== null) {
      this.toggleExpanded(this.openIndex, false);
    }
  }

  toggleExpanded(index, expand) {
    // close open menu, if applicable
    if (this.openIndex !== index) {
      this.toggleExpanded(this.openIndex, false);
    }

    // handle menu at called index
    const btn = this.buttons[index];

    if (btn) {
      const menu = this.controlledElems[index];
      const addOpenClass = () => {
        btn.classList.add(btn.openClass);
        menu.classList.add(menu.openClass);
      };
      const removeOpenClass = () => {
        btn.classList.remove(btn.openClass);
        menu.classList.remove(menu.openClass);
      };

      this.openIndex = expand ? index : null;
      btn.setAttribute(`aria-expanded`, expand);
      const handleClassList = expand ? addOpenClass : removeOpenClass;
      handleClassList();
    }
  }
}

export default Nav;
