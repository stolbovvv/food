function slider() {
  // script: slider
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
}

export default slider;
