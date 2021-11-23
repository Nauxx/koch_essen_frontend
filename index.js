const next = document.getElementById('button-forward');
const back = document.getElementById('button-back');
const checkboxes = document.querySelectorAll('.carousel__activator');
const cards = document.querySelectorAll('.carousel__card');
/* html collection vs node list */

const initialPageIndex = 0;
const maxPageIndex = checkboxes.length - 1;
let currentPageIndex = initialPageIndex;
const focusableElementsList =
  'a, button, select, textarea, input, [tabindex="0"]';

/* nur für screen reader kompabilität */
const hideOutOfFocusCards = () => {
  /* zuerst werden pauschal alle karten auf "unsichtbar" gesetzt */
  for (let i = 0; i < cards.length; i++) {
    cards[i].setAttribute('aria-hidden', true);

    let focusableElements = cards[i].querySelectorAll(focusableElementsList);

    /* für jede karte wird über alle fokussierbaren elemente iteriert */
    for (let j = 0; j < focusableElements.length; j++) {
      focusableElements[j].setAttribute('tabindex', '-1');
    }
  }

  /* dann werden die 2 gerade aktiven karten wieder sichtbar gemacht */
  for (let i = 2 * currentPageIndex; i <= 2 * currentPageIndex + 1; i++) {
    cards[i].removeAttribute('aria-hidden');

    let focusableElements = cards[i].querySelectorAll(focusableElementsList);

    /* für jede karte wird über alle fokussierbaren elemente iteriert */
    for (let j = 0; j < focusableElements.length; j++) {
      focusableElements[j].removeAttribute('tabindex');
    }
  }
};

hideOutOfFocusCards();

/* hideOutOfFocusCards() lässt sich praktischerweise bei Bedarf
auch für die zuweisung von styleklassen für die "angeteasterten" 
karten verwenden */

const handleCardTransfer = (forward) => {
  checkboxes[currentPageIndex].removeAttribute('checked');
  forward ? currentPageIndex++ : currentPageIndex--;
  checkboxes[currentPageIndex].setAttribute('checked', true);
};

const checkForUnmountingArrows = () => {
  if (currentPageIndex === maxPageIndex) {
    next.setAttribute('hidden', true);
  }
  if (currentPageIndex !== initialPageIndex && back.hasAttribute('hidden')) {
    back.removeAttribute('hidden');
  }
  if (currentPageIndex === initialPageIndex) {
    back.setAttribute('hidden', true);
  }
  if (currentPageIndex !== maxPageIndex && next.hasAttribute('hidden')) {
    next.removeAttribute('hidden');
  }
};

next.addEventListener('click', () => {
  handleCardTransfer(true);
  checkForUnmountingArrows();
  hideOutOfFocusCards();
});

back.addEventListener('click', () => {
  handleCardTransfer(false);
  checkForUnmountingArrows();
  hideOutOfFocusCards();
});
