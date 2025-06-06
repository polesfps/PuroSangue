document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carrousel-slide');
    const indicators = document.querySelectorAll('.carrousel-indicator');
    let current = 0;
    const interval = 4000; 
    let timer;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        if (indicators[i]) indicators[i].classList.toggle('active', i === index);
      });
      current = index;
    }

    function nextSlide() {
      let next = (current + 1) % slides.length;
      showSlide(next);
    }

    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => {
        showSlide(i);
        resetInterval();
      });
    });

    function resetInterval() {
      clearInterval(timer);
      timer = setInterval(nextSlide, interval);
    }

    timer = setInterval(nextSlide, interval);
    showSlide(current);
});

const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');
if (hamburger && navUl) {
  hamburger.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });
  navUl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navUl.classList.remove('active');
    });
  });
}

// Modal login
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal-auth');
  const btnLoginHomepage = document.getElementById('btn-login-homepage');
  const closeModal = document.getElementById('close-modal-auth');
  const tabButtons = modal.querySelectorAll('.tab-buttons button');
  const tabs = modal.querySelectorAll('.tab');

  function showTab(tabId) {
    tabs.forEach(tab => tab.classList.remove('active'));
    modal.querySelector('#' + tabId).classList.add('active');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) btn.classList.add('active');
    });
  }

  if (btnLoginHomepage) {
    btnLoginHomepage.addEventListener('click', function () {
      modal.classList.add('active');
      document.body.classList.add('modal-blur'); 
      showTab('login');
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', function () {
      modal.classList.remove('active');
      document.body.classList.remove('modal-blur'); 
    });
  }
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-blur'); 
    }
  });

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      showTab(this.getAttribute('data-tab'));
    });
  });
});

