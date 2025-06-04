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

