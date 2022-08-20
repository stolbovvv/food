"use strict";

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
    tabsWrapper.addEventListener('click', function (event) {
      var target = event.target;

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

  setClock('.timer', deadline);
});