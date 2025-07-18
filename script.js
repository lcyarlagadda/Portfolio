// ========== NAVBAR & SIDEBAR ACTIVE HIGHLIGHT ==========

// Helper to update .active on both navbar and sidebar links
function updateActiveLinks(currentId) {
  document.querySelectorAll('.navbar a, .sidebar a').forEach(link => {
    link.classList.remove('active');
    if (currentId && link.getAttribute('href') === '#' + currentId) {
      link.classList.add('active');
    }
  });
}

// Find current section in view
function getCurrentSection() {
  const scrollPos = window.scrollY + 150;
  let foundId = null;
  document.querySelectorAll('section[id]').forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      foundId = section.id;
    }
  });
  return foundId;
}

// On scroll: update highlight and navbar shadow
window.addEventListener('scroll', () => {
  updateActiveLinks(getCurrentSection());
  // Navbar shadow
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// On click: highlight right away, scroll, then let scroll event correct highlight
document.querySelectorAll('.navbar a[href^="#"], .sidebar a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      updateActiveLinks(targetId); // instant feedback
      target.scrollIntoView({ behavior: 'smooth' });
      // After scroll finishes, let scroll handler take over (timeout may be tuned)
      setTimeout(() => {
        updateActiveLinks(getCurrentSection());
      }, 500);
    }
    // If this is in sidebar, close sidebar on click (for mobile)
    if (this.closest('.sidebar')) {
      document.getElementById('sidebar').style.display = 'none';
    }
  });
});

// On load: set correct highlight
window.addEventListener('load', () => {
  updateActiveLinks(getCurrentSection());
});

// ========== FADE-UP/LEFT ANIMATIONS ==========

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
document.querySelectorAll('.fade-left').forEach(el => observer.observe(el));

// ========== SIDEBAR TOGGLE ==========

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
  }
}

// ========== FADE-LEFT ON SCROLL ==========

function animateOnScroll() {
  const fadeLefts = document.querySelectorAll('.fade-left');
  fadeLefts.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ========== HERO SECTION TYPING ANIMATION ==========

document.addEventListener("DOMContentLoaded", () => {
  const roles = ["Full-stack", "Frontend", "Backend", "Systems"];
  const element = document.getElementById("typing-role");
  if (!element) return;
  let roleIndex = 0;
  let charIndex = 0;
  let typing = true;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    if (typing) {
      element.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        typing = false;
        setTimeout(typeEffect, 1500); // Pause before deleting
        return;
      }
    } else {
      element.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        typing = true;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeEffect, typing ? 100 : 60);
  }
  typeEffect();
});

// ========== PROJECT FILTER BUTTONS ==========

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
      const categories = card.getAttribute('data-category').split(" ");
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
