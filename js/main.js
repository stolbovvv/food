"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

window.addEventListener('DOMContentLoaded', function () {
  // script: tabs
  var tabsItems = document.querySelectorAll('.tabheader__item');
  var tabsContent = document.querySelectorAll('.tabcontent');
  var tabsWrapper = document.querySelector('.tabcontainer');

  function hideTabsContent() {
    if (tabsContent.length > 0 && tabsItems.length > 0) {
      tabsContent.forEach(function (content) {
        content.classList.add('--hide');
        content.classList.remove('--show', '--anim-fade');
      });
      tabsItems.forEach(function (item) {
        item.classList.remove('tabheader__item_active');
      });
    } else {
      console.log('function "hideTabsContent", error: "Tabs item or tabs content not found"');
    }
  }

  function showTabsContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

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
    tabsWrapper.addEventListener('click', function (e) {
      var target = e.target;

      if (target && target.classList.contains('tabheader__item')) {
        tabsItems.forEach(function (item, i) {
          if (target === item) {
            hideTabsContent();
            showTabsContent(i);
          }
        });
      }
    });
  } // script: timer


  var deadline = '2022-09-01';

  function getTimeRemaining(endtime) {
    var _t = Date.parse(endtime) - Date.parse(new Date()) + new Date().getTimezoneOffset() * 60 * 1000;

    var _days = Math.floor(_t / 1000 / 60 / 60 / 24);

    var _hours = Math.floor(_t / 1000 / 60 / 60 % 24);

    var _minutes = Math.floor(_t / 1000 / 60 % 60);

    var _seconds = Math.floor(_t / 1000 % 60);

    return {
      total: _t,
      days: _days,
      hours: _hours,
      minutes: _minutes,
      seconds: _seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0".concat(num);
    } else {
      return num;
    }
  }

  function setClock(seclector, endtime) {
    var timer = document.querySelector(seclector);
    var days = timer.querySelector('#days');
    var hours = timer.querySelector('#hours');
    var minutes = timer.querySelector('#minutes');
    var seconds = timer.querySelector('#seconds');
    var timeInterval;

    function updeteClock() {
      var _t = getTimeRemaining(endtime);

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

  setClock('.timer', deadline); // script: modal

  var modalTrigger = document.querySelectorAll('[data-modal-trigger]');
  var modalBody = document.querySelector('.modal');
  var modalDialog = modalBody.querySelector('.modal__dialog');
  var modalTimerID;

  function openModal() {
    var widthBefore;
    var widthAfter;
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
    var scrollY = window.scrollY;
    var clientHeight = document.documentElement.clientHeight;
    var scrollHeight = document.documentElement.scrollHeight;

    if (scrollY + clientHeight >= scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  function showThanksModal(message) {
    var thanksModal = document.createElement('div');
    var contentModal = document.createElement('div');
    modalDialog.classList.add('--hide');
    thanksModal.classList.add('modal__dialog', '--anim-slide-bottom');
    contentModal.classList.add('modal__content');
    thanksModal.insertAdjacentElement('beforeend', contentModal);
    contentModal.insertAdjacentHTML('beforeend', '<div class="modal__close" data-modal-trigger="close">&times;</div>');
    contentModal.insertAdjacentHTML('beforeend', "<div class=\"modal__title\">".concat(message, "</div>"));
    modalBody.append(thanksModal);
    openModal();
    setTimeout(function () {
      thanksModal.remove();
      modalDialog.classList.add('--show');
      modalDialog.classList.remove('--hide');
      closeModal();
    }, 4000);
  }

  window.addEventListener('scroll', showModalByScroll);
  modalTimerID = setTimeout(openModal, 50000);
  modalTrigger.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      var target = e.target;
      if (target && trigger.dataset.modalTrigger === 'open') openModal();
      if (target && trigger.dataset.modalTrigger === 'close') closeModal();
    });
  });
  modalBody.addEventListener('click', function (e) {
    var target = e.target;
    if (target && target === modalBody) closeModal();
    if (target && target.dataset.modalTrigger === 'close') closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape' && modalBody.classList.contains('--show')) closeModal();
  }); // script: calsses

  var MenuCard = /*#__PURE__*/function () {
    function MenuCard(_ref) {
      var src = _ref.src,
          alt = _ref.alt,
          title = _ref.title,
          descr = _ref.descr,
          price = _ref.price,
          parentSelector = _ref.parentSelector,
          _ref$classes = _ref.classes,
          classes = _ref$classes === void 0 ? [] : _ref$classes;

      _classCallCheck(this, MenuCard);

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

    _createClass(MenuCard, [{
      key: "changeToRUB",
      value: function changeToRUB() {
        this.price *= this.transfer;
      }
    }, {
      key: "render",
      value: function render() {
        var _card$classList;

        var parent = this.parent;
        var classNames = this.classes;
        var card = document.createElement('div');
        var price = document.createElement('div');
        if (!classNames.includes('menu__item')) classNames.push('menu__item');

        (_card$classList = card.classList).add.apply(_card$classList, _toConsumableArray(classNames));

        card.insertAdjacentHTML('beforeend', "<img src=".concat(this.src, " alt=").concat(this.alt, " />"));
        card.insertAdjacentHTML('beforeend', "<h3 class=\"menu__item-subtitle\">".concat(this.title, "</h3>"));
        card.insertAdjacentHTML('beforeend', "<p class=\"menu__item-descr\">".concat(this.descr, "</p>"));
        card.insertAdjacentHTML('beforeend', "<div class=\"menu__item-divider\"></div>");
        price.classList.add('menu__item-price');
        price.insertAdjacentHTML('beforeend', "<div class=\"menu__item-cost\">\u0426\u0435\u043D\u0430:</div>");
        price.insertAdjacentHTML('beforeend', "<div class=\"menu__item-total\"><span>".concat(this.price, "</span> \u0440\u0443\u0431/\u0434\u0435\u043D\u044C</div>"));
        card.append(price);
        parent.append(card);
      }
    }]);

    return MenuCard;
  }();

  new MenuCard({
    src: './images/tabs/vegy.jpg',
    alt: 'vegy',
    title: 'Меню "Фитнес"',
    price: 9,
    parentSelector: '.menu .container',
    classes: ['menu__item', 'menu__item_new'],
    descr: "\u041C\u0435\u043D\u044E \"\u0424\u0438\u0442\u043D\u0435\u0441\" - \u044D\u0442\u043E \u043D\u043E\u0432\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434 \u043A \u043F\u0440\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u044E \u0431\u043B\u044E\u0434: \u0431\u043E\u043B\u044C\u0448\u0435 \u0441\u0432\u0435\u0436\u0438\u0445 \u043E\u0432\u043E\u0449\u0435\u0439 \u0438 \u0444\u0440\u0443\u043A\u0442\u043E\u0432. \u041F\u0440\u043E\u0434\u0443\u043A\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0438 \u0437\u0434\u043E\u0440\u043E\u0432\u044B\u0445 \u043B\u044E\u0434\u0435\u0439. \u042D\u0442\u043E \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E \u043D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0442 \u0441 \u043E\u043F\u0442\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0439 \u0446\u0435\u043D\u043E\u0439 \u0438 \u0432\u044B\u0441\u043E\u043A\u0438\u043C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E\u043C!"
  }).render();
  new MenuCard({
    src: './images/tabs/elite.jpg',
    alt: 'elite',
    title: 'Меню “Премиум”',
    price: 21,
    parentSelector: '.menu .container',
    descr: "\u0412 \u043C\u0435\u043D\u044E \u201C\u041F\u0440\u0435\u043C\u0438\u0443\u043C\u201D \u043C\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u0440\u0430\u0441\u0438\u0432\u044B\u0439 \u0434\u0438\u0437\u0430\u0439\u043D \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0438, \u043D\u043E \u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0431\u043B\u044E\u0434. \u041A\u0440\u0430\u0441\u043D\u0430\u044F \u0440\u044B\u0431\u0430, \u043C\u043E\u0440\u0435\u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B, \u0444\u0440\u0443\u043A\u0442\u044B - \u0440\u0435\u0441\u0442\u043E\u0440\u0430\u043D\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0431\u0435\u0437 \u043F\u043E\u0445\u043E\u0434\u0430 \u0432 \u0440\u0435\u0441\u0442\u043E\u0440\u0430\u043D!"
  }).render();
  new MenuCard({
    src: './images/tabs/post.jpg',
    alt: 'post',
    title: 'Меню "Постное"',
    price: 14,
    parentSelector: '.menu .container',
    classes: ['menu__item'],
    descr: "\u041C\u0435\u043D\u044E \u201C\u041F\u043E\u0441\u0442\u043D\u043E\u0435\u201D - \u044D\u0442\u043E \u0442\u0449\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u043E\u0434\u0431\u043E\u0440 \u0438\u043D\u0433\u0440\u0435\u0434\u0438\u0435\u043D\u0442\u043E\u0432: \u043F\u043E\u043B\u043D\u043E\u0435 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u0436\u0438\u0432\u043E\u0442\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044F, \u043C\u043E\u043B\u043E\u043A\u043E \u0438\u0437 \u043C\u0438\u043D\u0434\u0430\u043B\u044F, \u043E\u0432\u0441\u0430, \u043A\u043E\u043A\u043E\u0441\u0430 \u0438\u043B\u0438 \u0433\u0440\u0435\u0447\u043A\u0438, \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0431\u0435\u043B\u043A\u043E\u0432 \u0437\u0430 \u0441\u0447\u0435\u0442 \u0442\u043E\u0444\u0443 \u0438 \u0438\u043C\u043F\u043E\u0440\u0442\u043D\u044B\u0445 \u0432\u0435\u0433\u0435\u0442\u0430\u0440\u0438\u0430\u043D\u0441\u043A\u0438\u0445 \u0441\u0442\u0435\u0439\u043A\u043E\u0432."
  }).render(); // script: forms

  var forms = document.querySelectorAll('form');
  var message = {
    loading: 'images/icons/spinner.svg',
    success: 'Спасибо! Мы скорос в вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  function postData(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.display = 'block';
      statusMessage.style.margin = '0 auto';
      form.insertAdjacentElement('afterend', statusMessage);
      var formData = new FormData(form);
      var jsonData = {};

      var _iterator = _createForOfIteratorHelper(formData),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              key = _step$value[0],
              val = _step$value[1];

          jsonData[key] = val;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      fetch('./server1.php', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(jsonData)
      }).then(function (data) {
        return data.text();
      }).then(function (data) {
        console.log(data);
        showThanksModal(message.success);
      }).catch(function () {
        showThanksModal(message.failure);
      }).finally(function () {
        form.reset();
        statusMessage.remove();
      });
    });
  }

  forms.forEach(function (form) {
    return postData(form);
  });
});