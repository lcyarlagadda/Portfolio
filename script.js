function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
}

// Scroll-triggered animation for .about-content
function activateAboutAnimation() {
  const content = document.querySelector('.about-content');
  if (!content.classList.contains('active')) {
    const rect = content.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8) {
      content.classList.add('active');
    }
  }
}

// Scroll listener
window.addEventListener('scroll', activateAboutAnimation);

// Handle all anchor links smoothly
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth' });

    // If it's the about section, add active class after scroll delay
    if (this.getAttribute('href') === '#about') {
      setTimeout(() => {
        const content = document.querySelector('.about-content');
        content.classList.add('active');
      }, 600); // Adjust timing if scroll is faster/slower
    }
  });
});

function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-section');
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= windowHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

