document.addEventListener('DOMContentLoaded', () => {
  var carousel = (element) => {
    let carousel = document.getElementById(element);
    let next = carousel.querySelector('#button-forward');
    let back = carousel.querySelector('#button-back');
    let cards = carousel.querySelectorAll('.carousel__card');

    let initialPageIndex = 0;
    let maxPageIndex = Math.ceil(cards.length / 2) - 1;

    let state = { currentPageIndex: 0 };

    let handleOutOfFocusCards = () => {
      for (let i = 0; i < cards.length; i++) {
        cards[i].setAttribute('aria-hidden', true);
        cards[i].classList.add('carousel__card--inactive');

        let focusableElements = cards[i].querySelectorAll(
          'a, button, select, textarea, input, [tabindex="0"]'
        );

        for (let j = 0; j < focusableElements.length; j++) {
          focusableElements[j].setAttribute('tabindex', '-1');
        }
      }

      for (
        let i = 2 * state.currentPageIndex;
        i <= 2 * state.currentPageIndex + 1;
        i++
      ) {
        if (i < cards.length) {
          cards[i].removeAttribute('aria-hidden');
          cards[i].classList.remove('carousel__card--inactive');

          let focusableElements = cards[i].querySelectorAll(
            'a, button, select, textarea, input, [tabindex="0"]'
          );

          for (let j = 0; j < focusableElements.length; j++) {
            focusableElements[j].removeAttribute('tabindex');
          }
        }
      }
    };
    handleOutOfFocusCards();

    let handleArrows = () => {
      if (state.currentPageIndex === maxPageIndex) {
        next.setAttribute('hidden', true);
      }
      if (
        state.currentPageIndex !== initialPageIndex &&
        back.hasAttribute('hidden')
      ) {
        back.removeAttribute('hidden');
      }
      if (state.currentPageIndex === initialPageIndex) {
        back.setAttribute('hidden', true);
      }
      if (
        state.currentPageIndex !== maxPageIndex &&
        next.hasAttribute('hidden')
      ) {
        next.removeAttribute('hidden');
      }
    };

    let handleCardTransfer = (forward) => {
      forward ? state.currentPageIndex++ : state.currentPageIndex--;
      carousel.dataset.page = state.currentPageIndex + 1;
    };

    let render = () => {
      handleArrows();
      handleOutOfFocusCards();
    };

    next.addEventListener('click', () => {
      handleCardTransfer(true);
      render();
    });

    back.addEventListener('click', () => {
      handleCardTransfer(false);
      render();
    });

    return carousel;
  };

  carousel('carousel');
});
