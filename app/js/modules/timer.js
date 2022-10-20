function timer(id, deadline) {
  // script: timer

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

  setClock(id, deadline);
}

export default timer;
