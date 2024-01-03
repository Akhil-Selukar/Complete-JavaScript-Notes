'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
const btnShow = document.querySelectorAll('.show-modal');

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnShow.length; i++) {
  btnShow[i].addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}

btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
