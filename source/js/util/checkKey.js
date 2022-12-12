const checkKey = (evt, keyString) => {
  const TAB_KEYCODE = 9;
  const ESC_KEYCODE = 27;
  const SPACE_KEYCODE = 32;
  const ENTER_KEYCODE = 13;
  const ARROW_RIGHT_KEYCODE = 39;
  const ARROW_LEFT_KEYCODE = 37;
  const ARROW_DOWN_KEYCODE = 40;
  const ARROW_UP_KEYCODE = 38;
  const PAGE_UP_KEYCODE = 33;
  const PAGE_DOWN_KEYCODE = 34;
  const END_KEYCODE = 35;
  const HOME_KEYCODE = 36;

  const key = evt.key || evt.keyCode;
  const сheck = key === keyString;
  let extraCheck;

  switch (keyString) {
    case `Tab`:
      extraCheck = key === TAB_KEYCODE;
      break;

    case `Escape`:
      extraCheck = key === `Esc` || key === ESC_KEYCODE;
      break;

    case ` `:
      extraCheck = key === `Spacebar` || key === SPACE_KEYCODE;
      break;

    case `Enter`:
      extraCheck = key === ENTER_KEYCODE;
      break;

    case `ArrowRight`:
      extraCheck = key === `Right` || key === ARROW_RIGHT_KEYCODE;
      break;

    case `ArrowLeft`:
      extraCheck = key === `Left` || key === ARROW_LEFT_KEYCODE;
      break;

    case `ArrowDown`:
      extraCheck = key === `Down` || key === ARROW_DOWN_KEYCODE;
      break;

    case `ArrowUp`:
      extraCheck = key === `Up` || key === ARROW_UP_KEYCODE;
      break;

    case `PageUp`:
      extraCheck = key === PAGE_UP_KEYCODE;
      break;

    case `PageDown`:
      extraCheck = key === PAGE_DOWN_KEYCODE;
      break;

    case `End`:
      extraCheck = key === END_KEYCODE;
      break;

    case `Home`:
      extraCheck = key === HOME_KEYCODE;
      break;
  }

  return сheck || extraCheck;
};

const checkTab = (evt) => checkKey(evt, `Tab`);
const checkEsc = (evt) => checkKey(evt, `Escape`);
const checkSpace = (evt) => checkKey(evt, ` `);
const checkEnter = (evt) => checkKey(evt, `Enter`);
const checkArrowRight = (evt) => checkKey(evt, `ArrowRight`);
const checkArrowLeft = (evt) => checkKey(evt, `ArrowLeft`);
const checkArrowDown = (evt) => checkKey(evt, `ArrowDown`);
const checkArrowUp = (evt) => checkKey(evt, `ArrowUp`);
const checkPageUp = (evt) => checkKey(evt, `PageUp`);
const checkPageDown = (evt) => checkKey(evt, `PageDown`);
const checkEnd = (evt) => checkKey(evt, `End`);
const checkHome = (evt) => checkKey(evt, `Home`);

export {
  checkTab,
  checkEsc,
  checkSpace,
  checkEnter,
  checkArrowRight,
  checkArrowLeft,
  checkArrowDown,
  checkArrowUp,
  checkPageUp,
  checkPageDown,
  checkEnd,
  checkHome
};
