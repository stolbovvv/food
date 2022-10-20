/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/js/modules/calc.js":
/*!********************************!*\
  !*** ./app/js/modules/calc.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calc() {
  // script: calculating
  var result = document.querySelector('.calculating__result span');
  var sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female';
  var age = null;
  var ratio = localStorage.getItem('ratio') ? +localStorage.getItem('ratio') : 1.375;
  var height = null;
  var weight = null;
  function initStaticSettings(selector, activeClass) {
    var elements = document.querySelectorAll("".concat(selector, " div"));
    elements.forEach(function (elem) {
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
    var elements = document.querySelectorAll("".concat(parentSelector, " div"));
    elements.forEach(function (elem) {
      elem.addEventListener('click', function (e) {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }
        elements.forEach(function (elem) {
          return elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  function getDinamicInformation(selector) {
    var input = document.querySelector(selector);
    input.addEventListener('input', function () {
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
/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./app/js/modules/cards.js":
/*!*********************************!*\
  !*** ./app/js/modules/cards.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./app/js/services/services.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


// script: calsses
function cards() {
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
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(function (data) {
    data.forEach(function (_ref2) {
      var src = _ref2.src,
        alt = _ref2.alt,
        title = _ref2.title,
        descr = _ref2.descr,
        price = _ref2.price;
      new MenuCard({
        src: src,
        alt: alt,
        title: title,
        descr: descr,
        price: price,
        parentSelector: '.menu .container'
      }).render();
    });
  });
}
/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./app/js/modules/forms.js":
/*!*********************************!*\
  !*** ./app/js/modules/forms.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./app/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./app/js/services/services.js");


function forms(form) {
  // script: forms
  var forms = document.querySelectorAll(form);
  var message = {
    loading: 'images/icons/spinner.svg',
    success: 'Спасибо! Мы скорос в вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  function bindPostData(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.display = 'block';
      statusMessage.style.margin = '0 auto';
      form.insertAdjacentElement('afterend', statusMessage);
      var formData = new FormData(form);
      var jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', jsonData).then(function (data) {
        console.log(data);
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showThanksModal)(document.querySelector('.modal'), message.success);
      }).catch(function () {
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showThanksModal)(document.querySelector('.modal'), message.failure);
      }).finally(function () {
        form.reset();
        statusMessage.remove();
      });
    });
  }
  forms.forEach(function (form) {
    return bindPostData(form);
  });
}
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./app/js/modules/modal.js":
/*!*********************************!*\
  !*** ./app/js/modules/modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; },
/* harmony export */   "showThanksModal": function() { return /* binding */ showThanksModal; }
/* harmony export */ });
function openModal(modal, modalTimerID) {
  var modalDialog = modal.querySelector('.modal__dialog');
  var widthBefore;
  var widthAfter;
  widthBefore = document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  widthAfter = document.documentElement.clientWidth;
  if (widthBefore !== widthAfter) document.body.style.paddingRight = Math.abs(widthAfter - widthBefore) + 'px';
  modal.classList.add('--show', '--anim-fade');
  modal.classList.remove('--hide');
  modalDialog.classList.add('--anim-slide-bottom');
  if (modalTimerID) clearTimeout(modalTimerID);
}
function closeModal(modal) {
  var modalDialog = modal.querySelector('.modal__dialog');
  modal.classList.add('--hide');
  modal.classList.remove('--show', '--anim-fade');
  modalDialog.classList.remove('--anim-slide-bottom');
  if (document.body.style.overflow) document.body.style.overflow = '';
  if (document.body.style.paddingRight) document.body.style.paddingRight = '';
}
function showThanksModal(modal, message) {
  var modalDialog = modal.querySelector('.modal__dialog');
  var thanksModal = document.createElement('div');
  var contentModal = document.createElement('div');
  modalDialog.classList.add('--hide');
  thanksModal.classList.add('modal__dialog', '--anim-slide-bottom');
  contentModal.classList.add('modal__content');
  thanksModal.insertAdjacentElement('beforeend', contentModal);
  contentModal.insertAdjacentHTML('beforeend', '<div class="modal__close" data-modal-trigger="close">&times;</div>');
  contentModal.insertAdjacentHTML('beforeend', "<div class=\"modal__title\">".concat(message, "</div>"));
  modal.append(thanksModal);
  openModal(modal);
  setTimeout(function () {
    thanksModal.remove();
    modalDialog.classList.add('--show');
    modalDialog.classList.remove('--hide');
    closeModal(modal);
  }, 4000);
}
function modal(trigger, modal, modalTimerID) {
  // script: modal
  var modalTrigger = document.querySelectorAll(trigger);
  var modalBody = document.querySelector(modal);
  function showModalByScroll() {
    var scrollY = window.scrollY;
    var clientHeight = document.documentElement.clientHeight;
    var scrollHeight = document.documentElement.scrollHeight;
    if (scrollY + clientHeight >= scrollHeight - 1) {
      openModal(modalBody, modalTimerID);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);
  modalTrigger.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      var target = e.target;
      if (target && trigger.dataset.modalTrigger === 'open') openModal(modalBody, modalTimerID);
      if (target && trigger.dataset.modalTrigger === 'close') closeModal(modalBody);
    });
  });
  modalBody.addEventListener('click', function (e) {
    var target = e.target;
    if (target && target === modalBody) closeModal(modalBody);
    if (target && target.dataset.modalTrigger === 'close') closeModal(modalBody);
  });
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape' && modalBody.classList.contains('--show')) closeModal(modalBody);
  });
}



/* harmony default export */ __webpack_exports__["default"] = (modal);

/***/ }),

/***/ "./app/js/modules/slider.js":
/*!**********************************!*\
  !*** ./app/js/modules/slider.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider() {
  // script: slider
  var total = document.querySelector('#total');
  var current = document.querySelector('#current');
  var slider = document.querySelector('.offer__slider');
  var slides = document.querySelectorAll('.offer__slide');
  var prevBtn = document.querySelector('.offer__slider-prev');
  var nextBtn = document.querySelector('.offer__slider-next');
  var sliderWrapper = document.querySelector('.offer__slider-wrapper');
  var sliderField = document.querySelector('.offer__slider-inner');
  var sliderWidth = sliderWrapper.offsetWidth;
  var slideIndex = 0;
  var slideOffset = 0;
  slider.style.position = 'relative';
  sliderWrapper.style.overflow = 'hidden';
  sliderField.style.width = 100 * slides.length + '%';
  sliderField.style.display = 'flex';
  sliderField.style.transition = '0.5s all';
  slides.forEach(function (slide) {
    return slide.style.width = sliderWidth;
  });
  if (slides.length < 10) {
    total.textContent = "0".concat(slides.length);
    current.textContent = "0".concat(slideIndex + 1);
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex + 1;
  }
  var indicator = document.createElement('ol');
  var dots = [];
  indicator.classList.add('carousel-indicators');
  slider.append(indicator);
  for (var i = 0; i < slides.length; i += 1) {
    var dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i);
    if (i == 0) dot.style.opacity = 1;
    indicator.append(dot);
    dots.push(dot);
  }
  nextBtn.addEventListener('click', function () {
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
      current.textContent = "0".concat(slideIndex + 1);
    } else {
      current.textContent = slideIndex + 1;
    }
    dots.forEach(function (dot) {
      return dot.style.opacity = '0.5';
    });
    dots[slideIndex].style.opacity = '1';
    sliderField.style.transform = "translateX(-".concat(slideOffset, "px)");
  });
  prevBtn.addEventListener('click', function () {
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
      current.textContent = "0".concat(slideIndex + 1);
    } else {
      current.textContent = slideIndex + 1;
    }
    dots.forEach(function (dot) {
      return dot.style.opacity = '0.5';
    });
    dots[slideIndex].style.opacity = '1';
    sliderField.style.transform = "translateX(-".concat(slideOffset, "px)");
  });
  dots.forEach(function (dot) {
    dot.addEventListener('click', function (e) {
      var slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = +slideTo;
      slideOffset = sliderWidth * slideTo;
      sliderField.style.transform = "translateX(-".concat(slideOffset, "px)");
      if (slides.length < 10) {
        current.textContent = "0".concat(slideIndex + 1);
      } else {
        current.textContent = slideIndex + 1;
      }
      dots.forEach(function (dot) {
        return dot.style.opacity = '0.5';
      });
      dots[slideIndex].style.opacity = '1';
    });
  });
}
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./app/js/modules/tabs.js":
/*!********************************!*\
  !*** ./app/js/modules/tabs.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// script: tabs
function tabs(tabsClass, contentClass, wrapperClass, activeClass) {
  var tabsItems = document.querySelectorAll(tabsClass);
  var tabsContent = document.querySelectorAll(contentClass);
  var tabsWrapper = document.querySelector(wrapperClass);
  function hideTabsContent() {
    if (tabsContent.length > 0 && tabsItems.length > 0) {
      tabsContent.forEach(function (content) {
        content.classList.add('--hide');
        content.classList.remove('--show', '--anim-fade');
      });
      tabsItems.forEach(function (item) {
        item.classList.remove(activeClass);
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
      tabsItems[i].classList.add(activeClass);
    } else {
      console.log('function "showTabsContent", error: "Tabs item or tabs content not found"');
    }
  }
  hideTabsContent();
  showTabsContent();
  if (tabsWrapper) {
    tabsWrapper.addEventListener('click', function (e) {
      var target = e.target;
      if (target && target.classList.contains(tabsClass.slice(1))) {
        tabsItems.forEach(function (item, i) {
          if (target === item) {
            hideTabsContent();
            showTabsContent(i);
          }
        });
      }
    });
  }
}
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./app/js/modules/timer.js":
/*!*********************************!*\
  !*** ./app/js/modules/timer.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  // script: timer

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
  setClock(id, deadline);
}
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./app/js/services/services.js":
/*!*************************************!*\
  !*** ./app/js/services/services.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var postData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json; charset=utf-8'
              },
              body: data
            });
          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();
          case 5:
            return _context.abrupt("return", _context.sent);
          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function postData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getResource = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(url) {
    var res;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(url);
          case 2:
            res = _context2.sent;
            if (res.ok) {
              _context2.next = 5;
              break;
            }
            throw new Error("Could not fetch ".concat(url, ", status: ").concat(res.status));
          case 5:
            _context2.next = 7;
            return res.json();
          case 7:
            return _context2.abrupt("return", _context2.sent);
          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getResource(_x3) {
    return _ref2.apply(this, arguments);
  };
}();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./app/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./app/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./app/js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./app/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./app/js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./app/js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./app/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./app/js/modules/slider.js");








window.addEventListener('DOMContentLoaded', function () {
  var modalTimerID = setTimeout(function () {
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(document.querySelector('.modal'), modalTimerID);
  }, 50000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal-trigger]', '.modal', modalTimerID);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-11-01');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=common.js.map