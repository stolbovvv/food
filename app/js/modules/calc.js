function calc() {
  // script: calculating
  const result = document.querySelector('.calculating__result span');

  let sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female';
  let age = null;
  let ratio = localStorage.getItem('ratio') ? +localStorage.getItem('ratio') : 1.375;
  let height = null;
  let weight = null;

  function initStaticSettings(selector, activeClass) {
    const elements = document.querySelectorAll(`${selector} div`);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute('id') === localStorage.getItem('sex')) elem.classList.add(activeClass);
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) elem.classList.add(activeClass);
    });
  }

  function calcTotal() {
    if (!sex || !age || !ratio || !height || !weight) {
      result.textContent = '____';
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach((elem) => elem.classList.remove(activeClass));
        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  function getDinamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.outline = '4px solid tomato';
      } else {
        input.style.outline = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          localStorage.setItem('height', +input.value);
          break;
        case 'weight':
          weight = +input.value;
          localStorage.setItem('weight', +input.value);
          break;
        case 'age':
          age = +input.value;
          localStorage.setItem('age', +input.value);
          break;
      }

      calcTotal();
    });
  }

  calcTotal();

  initStaticSettings('#gender', 'calculating__choose-item_active');
  initStaticSettings('.calculating__choose_big', 'calculating__choose-item_active');
  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
  getDinamicInformation('#height');
  getDinamicInformation('#weight');
  getDinamicInformation('#age');
}

export default calc;
