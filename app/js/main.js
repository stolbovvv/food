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
});
