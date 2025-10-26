


const modal = document.getElementById('feedback-modal');
const feedbackLink = document.getElementById('feedback-link');
const closeEls = modal ? modal.querySelectorAll('[data-close]') : [];

const privacyModal = document.getElementById('privacy-modal');
const privacyLink = document.getElementById('privacy-link');
const privacyCloseEls = privacyModal ? privacyModal.querySelectorAll('[data-close]') : [];

const signupModal = document.getElementById('signup-modal');
const signupLink = document.getElementById('signup-link');
const signupCloseEls = signupModal ? signupModal.querySelectorAll('[data-close]') : [];

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('is-open');
  modalEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('is-open');
  modalEl.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (feedbackLink) {
  feedbackLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(modal);
  });
}

if (privacyLink) {
  privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(privacyModal);
  });
}

if (signupLink) {
  signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(signupModal);
  });
}

closeEls.forEach((el) => el.addEventListener('click', () => closeModal(modal)));
privacyCloseEls.forEach((el) => el.addEventListener('click', () => closeModal(privacyModal)));
signupCloseEls.forEach((el) => el.addEventListener('click', () => closeModal(signupModal)));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(modal);
    closeModal(privacyModal);
    closeModal(signupModal);
  }
});

const radioButtons = document.querySelectorAll('input[type="radio"][name="query"]');
let lastChecked = null;

radioButtons.forEach(radio => {
  radio.addEventListener('click', (e) => {
    if (lastChecked === e.target) {
      e.target.checked = false;
      lastChecked = null;
    } else {
      lastChecked = e.target;
    }
  });
});
