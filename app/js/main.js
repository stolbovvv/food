import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimerID = setTimeout(() => {
    openModal(document.querySelector('.modal'), modalTimerID);
  }, 50000);

  tabs('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
  modal('[data-modal-trigger]', '.modal', modalTimerID);
  timer('.timer', '2022-11-01');
  cards();
  calc();
  forms('form');
  slider();
});
