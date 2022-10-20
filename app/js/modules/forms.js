import { showThanksModal } from './modal';
import { postData } from '../services/services';

function forms(form) {
  // script: forms
  const forms = document.querySelectorAll(form);
  const message = {
    loading: 'images/icons/spinner.svg',
    success: 'Спасибо! Мы скорос в вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.display = 'block';
      statusMessage.style.margin = '0 auto';

      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);
      const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', jsonData)
        .then((data) => {
          console.log(data);
          showThanksModal(document.querySelector('.modal'), message.success);
        })
        .catch(() => {
          showThanksModal(document.querySelector('.modal'), message.failure);
        })
        .finally(() => {
          form.reset();
          statusMessage.remove();
        });
    });
  }

  forms.forEach((form) => bindPostData(form));
}

export default forms;
