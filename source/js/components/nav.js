class Nav {
  constructor(navElem) {
    this.navElem = navElem;
    this.buttons = [
      ...this.navElem.querySelectorAll(`button[aria-controls]`)
    ];

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
      const controlledElemId = btn.getAttribute(`aria-controls`);
      btn.controlledElem = this.navElem.querySelector(`#${controlledElemId}`);

      if (btn.controlledElem !== null) {
        const btnNoJsClass = getNoJsClass(btn);
        const controlledElemNoJsClass = getNoJsClass(btn.controlledElem);

        btn.openClass = getOpenClass(btnNoJsClass);
        btn.controlledElemOpenClass = getOpenClass(controlledElemNoJsClass);

        btn.classList.remove(btnNoJsClass);
        btn.controlledElem.classList.remove(controlledElemNoJsClass);
        btn.setAttribute(`aria-expanded`, false);
        btn.addEventListener(`click`, this.onButtonClick.bind(this));
      }
    });
  }

  onButtonClick(evt) {
    const target = evt.currentTarget;
    const expanded = target.getAttribute(`aria-expanded`) === `true`;

    target.setAttribute(`aria-expanded`, !expanded);
    target.classList.toggle(target.openClass);
    target.controlledElem.classList.toggle(target.controlledElemOpenClass);
  }
}

export default Nav;
