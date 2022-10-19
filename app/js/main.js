window.addEventListener('DOMContentLoaded', () => {
  // script: tabs
  const tabsItems = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsWrapper = document.querySelector('.tabcontainer');

  function hideTabsContent() {
    if (tabsContent.length > 0 && tabsItems.length > 0) {
      tabsContent.forEach((content) => {
        content.classList.add('--hide');
        content.classList.remove('--show', '--anim-fade');
      });

      tabsItems.forEach((item) => {
        item.classList.remove('tabheader__item_active');
      });
    } else {
      console.log('function "hideTabsContent", error: "Tabs item or tabs content not found"');
    }
  }

  function showTabsContent(i = 0) {
    if (tabsContent.length > 0 && tabsItems.length > 0) {
      tabsContent[i].classList.add('--show', '--anim-fade');
      tabsContent[i].classList.remove('--hide');
      tabsItems[i].classList.add('tabheader__item_active');
    } else {
      console.log('function "showTabsContent", error: "Tabs item or tabs content not found"');
    }
  }

  hideTabsContent();
  showTabsContent();

  if (tabsWrapper) {
    tabsWrapper.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.classList.contains('tabheader__item')) {
        tabsItems.forEach((item, i) => {
          if (target === item) {
            hideTabsContent();
            showTabsContent(i);
          }
        });
      }
    });
  }

  // script: timer
  const deadline = '2022-11-01';

  function getTimeRemaining(endtime) {
    const _t = Date.parse(endtime) - Date.parse(new Date()) + new Date().getTimezoneOffset() * 60 * 1000;
    const _days = Math.floor(_t / 1000 / 60 / 60 / 24);
    const _hours = Math.floor((_t / 1000 / 60 / 60) % 24);
    const _minutes = Math.floor((_t / 1000 / 60) % 60);
    const _seconds = Math.floor((_t / 1000) % 60);

    return {
      total: _t,
      days: _days,
      hours: _hours,
      minutes: _minutes,
      seconds: _seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(seclector, endtime) {
    const timer = document.querySelector(seclector);

    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');

    let timeInterval;

    function updeteClock() {
      const _t = getTimeRemaining(endtime);

      days.innerHTML = getZero(_t.days);
      hours.innerHTML = getZero(_t.hours);
      minutes.innerHTML = getZero(_t.minutes);
      seconds.innerHTML = getZero(_t.seconds);

      if (_t.total <= 0) {
        clearInterval(timeInterval);

        days.innerHTML = '00';
        hours.innerHTML = '00';
        minutes.innerHTML = '00';
        seconds.innerHTML = '00';
      }
    }

    updeteClock();

    timeInterval = setInterval(updeteClock, 1000);
  }

  setClock('.timer', deadline);

  // script: modal
  const modalTrigger = document.querySelectorAll('[data-modal-trigger]');
  const modalBody = document.querySelector('.modal');
  const modalDialog = modalBody.querySelector('.modal__dialog');

  let modalTimerID;

  function openModal() {
    let widthBefore;
    let widthAfter;

    widthBefore = document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    widthAfter = document.documentElement.clientWidth;

    if (widthBefore !== widthAfter) document.body.style.paddingRight = Math.abs(widthAfter - widthBefore) + 'px';

    modalBody.classList.add('--show', '--anim-fade');
    modalBody.classList.remove('--hide');
    modalDialog.classList.add('--anim-slide-bottom');

    clearTimeout(modalTimerID);
  }

  function closeModal() {
    modalBody.classList.add('--hide');
    modalBody.classList.remove('--show', '--anim-fade');
    modalDialog.classList.remove('--anim-slide-bottom');

    if (document.body.style.overflow) document.body.style.overflow = '';
    if (document.body.style.paddingRight) document.body.style.paddingRight = '';
  }

  function showModalByScroll() {
    const scrollY = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollY + clientHeight >= scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  function showThanksModal(message) {
    const thanksModal = document.createElement('div');
    const contentModal = document.createElement('div');

    modalDialog.classList.add('--hide');
    thanksModal.classList.add('modal__dialog', '--anim-slide-bottom');
    contentModal.classList.add('modal__content');

    thanksModal.insertAdjacentElement('beforeend', contentModal);
    contentModal.insertAdjacentHTML('beforeend', '<div class="modal__close" data-modal-trigger="close">&times;</div>');
    contentModal.insertAdjacentHTML('beforeend', `<div class="modal__title">${message}</div>`);

    modalBody.append(thanksModal);

    openModal();

    setTimeout(() => {
      thanksModal.remove();
      modalDialog.classList.add('--show');
      modalDialog.classList.remove('--hide');
      closeModal();
    }, 4000);
  }

  window.addEventListener('scroll', showModalByScroll);

  modalTimerID = setTimeout(openModal, 50000);

  modalTrigger.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      const target = e.target;

      if (target && trigger.dataset.modalTrigger === 'open') openModal();
      if (target && trigger.dataset.modalTrigger === 'close') closeModal();
    });
  });

  modalBody.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target === modalBody) closeModal();
    if (target && target.dataset.modalTrigger === 'close') closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalBody.classList.contains('--show')) closeModal();
  });

  // script: calsses
  class MenuCard {
    constructor({ src, alt, title, descr, price, parentSelector, classes = [] }) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 65;
      this.changeToRUB();
    }

    changeToRUB() {
      this.price *= this.transfer;
    }

    render() {
      const parent = this.parent;
      const classNames = this.classes;
      const card = document.createElement('div');
      const price = document.createElement('div');

      if (!classNames.includes('menu__item')) classNames.push('menu__item');

      card.classList.add(...classNames);

      card.insertAdjacentHTML('beforeend', `<img src=${this.src} alt=${this.alt} />`);
      card.insertAdjacentHTML('beforeend', `<h3 class="menu__item-subtitle">${this.title}</h3>`);
      card.insertAdjacentHTML('beforeend', `<p class="menu__item-descr">${this.descr}</p>`);
      card.insertAdjacentHTML('beforeend', `<div class="menu__item-divider"></div>`);

      price.classList.add('menu__item-price');

      price.insertAdjacentHTML('beforeend', `<div class="menu__item-cost">Цена:</div>`);
      price.insertAdjacentHTML('beforeend', `<div class="menu__item-total"><span>${this.price}</span> руб/день</div>`);

      card.append(price);
      parent.append(card);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);

    return await res.json();
  };

  getResource('http://localhost:3000/menu').then((data) => {
    data.forEach(({ src, alt, title, descr, price }) => {
      new MenuCard({ src, alt, title, descr, price, parentSelector: '.menu .container' }).render();
    });
  });

  // script: forms
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'images/icons/spinner.svg',
    success: 'Спасибо! Мы скорос в вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.display = 'block';
      statusMessage.style.margin = '0 auto';

      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);
      const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', jsonData)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
          statusMessage.remove();
        });
    });
  }

  forms.forEach((form) => bindPostData(form));

  // script: fslider
  const total = document.querySelector('#total');
  const current = document.querySelector('#current');
  const slider = document.querySelector('.offer__slider');
  const slides = document.querySelectorAll('.offer__slide');
  const prevBtn = document.querySelector('.offer__slider-prev');
  const nextBtn = document.querySelector('.offer__slider-next');
  const sliderWrapper = document.querySelector('.offer__slider-wrapper');
  const sliderField = document.querySelector('.offer__slider-inner');
  const sliderWidth = sliderWrapper.offsetWidth;

  let slideIndex = 0;
  let slideOffset = 0;

  slider.style.position = 'relative';
  sliderWrapper.style.overflow = 'hidden';
  sliderField.style.width = 100 * slides.length + '%';
  sliderField.style.display = 'flex';
  sliderField.style.transition = '0.5s all';

  slides.forEach((slide) => (slide.style.width = sliderWidth));

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex + 1}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex + 1;
  }

  const indicator = document.createElement('ol');
  const dots = [];

  indicator.classList.add('carousel-indicators');

  slider.append(indicator);

  for (let i = 0; i < slides.length; i += 1) {
    const dot = document.createElement('li');

    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i);

    if (i == 0) dot.style.opacity = 1;

    indicator.append(dot);
    dots.push(dot);
  }

  nextBtn.addEventListener('click', () => {
    if (slideOffset === sliderWidth * (slides.length - 1)) {
      slideOffset = 0;
    } else {
      slideOffset += sliderWidth;
    }

    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex += 1;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex + 1}`;
    } else {
      current.textContent = slideIndex + 1;
    }

    dots.forEach((dot) => (dot.style.opacity = '0.5'));
    dots[slideIndex].style.opacity = '1';

    sliderField.style.transform = `translateX(-${slideOffset}px)`;
  });

  prevBtn.addEventListener('click', () => {
    if (slideOffset === 0) {
      slideOffset = sliderWidth * (slides.length - 1);
    } else {
      slideOffset -= sliderWidth;
    }

    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex -= 1;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex + 1}`;
    } else {
      current.textContent = slideIndex + 1;
    }

    dots.forEach((dot) => (dot.style.opacity = '0.5'));
    dots[slideIndex].style.opacity = '1';

    sliderField.style.transform = `translateX(-${slideOffset}px)`;
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = +slideTo;
      slideOffset = sliderWidth * slideTo;

      sliderField.style.transform = `translateX(-${slideOffset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex + 1}`;
      } else {
        current.textContent = slideIndex + 1;
      }

      dots.forEach((dot) => (dot.style.opacity = '0.5'));
      dots[slideIndex].style.opacity = '1';
    });
  });

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

  const promisify = (item, delay) => new Promise((resolve) => setTimeout(() => resolve(item), delay));

  const a = () => promisify('a', 100);
  const b = () => promisify('b', 5000);
  const c = () => promisify('c', 3000);

  function one() {
    const promises = [a(), b(), c()];
    Promise.all(promises).then((values) => console.log(values));
  }

  one();
});
