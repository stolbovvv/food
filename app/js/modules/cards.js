import { getResource } from '../services/services';

// script: calsses
function cards() {
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

  getResource('http://localhost:3000/menu').then((data) => {
    data.forEach(({ src, alt, title, descr, price }) => {
      new MenuCard({ src, alt, title, descr, price, parentSelector: '.menu .container' }).render();
    });
  });
}

export default cards;
