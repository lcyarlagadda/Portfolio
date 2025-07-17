// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Animate once
      }
    });
  },
  { threshold: 0.1 }
);

// Observe all fade-up elements
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Optional: Sidebar toggle (only if still in use)
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
  }
}
