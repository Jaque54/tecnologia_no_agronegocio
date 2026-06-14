const revealElements = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.stat-number');
const navLinks = document.querySelectorAll('.main-nav a');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.main-nav');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

const animateNumbers = () => {
  statNumbers.forEach(element => {
    const target = Number(element.dataset.target || element.datasetTarget) || 0;
    const suffix = element.dataset.suffix || '';
    const duration = 1700;
    let current = 0;
    if (target <= 0) {
      element.textContent = `0${suffix}`;
      return;
    }
    const stepTime = Math.max(Math.floor(duration / target), 15);
    const timer = setInterval(() => {
      current += 1;
      element.textContent = `${current}${suffix}`;
      if (current >= target) {
        element.textContent = `${target}${suffix}`;
        clearInterval(timer);
      }
    }, stepTime);
  });
};

const statsSection = document.querySelector('#benefits');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  statsObserver.observe(statsSection);
}

const highlightNav = () => {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  navLinks.forEach((link, index) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
  });
};

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  navLinks.forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);
