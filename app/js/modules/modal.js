function openModal(modal, modalTimerID) {
  const modalDialog = modal.querySelector('.modal__dialog');
  let widthBefore;
  let widthAfter;

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
  const modalDialog = modal.querySelector('.modal__dialog');

  modal.classList.add('--hide');
  modal.classList.remove('--show', '--anim-fade');
  modalDialog.classList.remove('--anim-slide-bottom');

  if (document.body.style.overflow) document.body.style.overflow = '';
  if (document.body.style.paddingRight) document.body.style.paddingRight = '';
}

function showThanksModal(modal, message) {
  const modalDialog = modal.querySelector('.modal__dialog');
  const thanksModal = document.createElement('div');
  const contentModal = document.createElement('div');

  modalDialog.classList.add('--hide');
  thanksModal.classList.add('modal__dialog', '--anim-slide-bottom');
  contentModal.classList.add('modal__content');

  thanksModal.insertAdjacentElement('beforeend', contentModal);
  contentModal.insertAdjacentHTML('beforeend', '<div class="modal__close" data-modal-trigger="close">&times;</div>');
  contentModal.insertAdjacentHTML('beforeend', `<div class="modal__title">${message}</div>`);

  modal.append(thanksModal);

  openModal(modal);

  setTimeout(() => {
    thanksModal.remove();
    modalDialog.classList.add('--show');
    modalDialog.classList.remove('--hide');
    closeModal(modal);
  }, 4000);
}

function modal(trigger, modal, modalTimerID) {
  // script: modal
  const modalTrigger = document.querySelectorAll(trigger);
  const modalBody = document.querySelector(modal);

  function showModalByScroll() {
    const scrollY = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollY + clientHeight >= scrollHeight - 1) {
      openModal(modalBody, modalTimerID);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  modalTrigger.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      const target = e.target;

      if (target && trigger.dataset.modalTrigger === 'open') openModal(modalBody, modalTimerID);
      if (target && trigger.dataset.modalTrigger === 'close') closeModal(modalBody);
    });
  });

  modalBody.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target === modalBody) closeModal(modalBody);
    if (target && target.dataset.modalTrigger === 'close') closeModal(modalBody);
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalBody.classList.contains('--show')) closeModal(modalBody);
  });
}

export { openModal };
export { closeModal };
export { showThanksModal };
export default modal;
