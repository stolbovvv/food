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
  const deadline = '2022-09-01';

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
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalBody.classList.contains('--show')) closeModal();
  });

  modalTimerID = setTimeout(openModal, 10000);

  function showModalByScroll() {
    const scrollY = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollY + clientHeight >= scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

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

  new MenuCard({
    src: './images/tabs/vegy.jpg',
    alt: 'vegy',
    title: 'Меню "Фитнес"',
    price: 9,
    parentSelector: '.menu .container',
    classes: ['menu__item', 'menu__item_new'],
    descr: `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
  }).render();

  new MenuCard({
    src: './images/tabs/elite.jpg',
    alt: 'elite',
    title: 'Меню “Премиум”',
    price: 21,
    parentSelector: '.menu .container',
    descr: `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
  }).render();

  new MenuCard({
    src: './images/tabs/post.jpg',
    alt: 'post',
    title: 'Меню "Постное"',
    price: 14,
    parentSelector: '.menu .container',
    classes: ['menu__item'],
    descr: `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
  }).render();

  // script: forms
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Мы скорос в вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');

      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;

      form.append(statusMessage);

      const jsonData = {};
      const formData = new FormData(form);

      for (const [key, val] of formData) {
        jsonData[key] = val;
      }

      const xhr = new XMLHttpRequest();

      xhr.open('POST', './server.php');
      xhr.setRequestHeader('Content-type', 'aplication/json');
      xhr.send(JSON.stringify(jsonData));

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          console.log(xhr.response);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => statusMessage.remove(), 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }

  forms.forEach((form) => postData(form));
});
