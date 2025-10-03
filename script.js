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

// ========== SKILLS PAGINATION ==========

function updateSkillsPagination() {
  const scrollWrapper = document.querySelector('.skills-scroll-wrapper');
  const dots = document.querySelectorAll('.dot');
  const skillCards = document.querySelectorAll('.skill-card');
  
  if (!scrollWrapper || !dots.length || !skillCards.length) return;
  
  const scrollLeft = scrollWrapper.scrollLeft;
  const clientWidth = scrollWrapper.clientWidth;
  const cardWidth = skillCards[0].offsetWidth;
  const gap = 20; // gap between cards
  const totalCardWidth = cardWidth + gap;
  
  // Calculate which cards are currently visible
  const visibleStart = Math.floor(scrollLeft / totalCardWidth);
  const visibleEnd = Math.ceil((scrollLeft + clientWidth) / totalCardWidth);
  
  // Update dots based on visible cards
  dots.forEach((dot, index) => {
    if (index >= visibleStart && index < visibleEnd) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Add scroll listener to skills section
document.addEventListener('DOMContentLoaded', () => {
  const skillsScrollWrapper = document.querySelector('.skills-scroll-wrapper');
  if (skillsScrollWrapper) {
    skillsScrollWrapper.addEventListener('scroll', updateSkillsPagination);
  }
  
  // Add click handlers to dots
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const scrollWrapper = document.querySelector('.skills-scroll-wrapper');
      if (scrollWrapper) {
        const cardWidth = scrollWrapper.querySelector('.skill-card').offsetWidth;
        const gap = 20; // gap between cards
        const scrollPosition = index * (cardWidth + gap);
        scrollWrapper.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Modal references
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalImg = modalOverlay.querySelector('.project-modal-img');
  const modalTitle = modalOverlay.querySelector('.project-modal-title');
  const modalDesc = modalOverlay.querySelector('.project-modal-desc');
  const modalTags = modalOverlay.querySelector('.project-modal-tags');
  const modalClose = modalOverlay.querySelector('.project-modal-close');
  const modalLinks = modalOverlay.querySelector('.project-modal-links');
 const githubBtn = modalLinks.querySelector('.github-btn');


  // Open modal on plus button click
  document.querySelectorAll('.project-plus').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      // Find the parent card
      const card = this.closest('.project-card');
      if (!card){
        console.log("No cards");
        return;
      };
      console.log(card);

      // Set modal content from data attributes
      modalTitle.textContent = card.getAttribute('data-title') || '';
      modalDesc.textContent = card.getAttribute('data-desc') || '';
      modalImg.src = card.getAttribute('data-img') || '';
      modalImg.alt = card.getAttribute('data-title') || '';
      const githubUrl = card.getAttribute('data-github');
      if (githubUrl) {
        githubBtn.style.display = 'inline-block';
        githubBtn.href = githubUrl;
      } else {
        githubBtn.style.display = 'none';
      }
      // Tags
      const tags = (card.getAttribute('data-tags') || '')
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);
      if (tags.length) {
        modalTags.innerHTML = tags.map(tag => `<span class="project-modal-tag">${tag}</span>`).join('');
        modalTags.style.display = 'flex';
      } else {
        modalTags.innerHTML = '';
        modalTags.style.display = 'none';
      }

      // Show modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
  });

  // Close modal (X button or clicking overlay)
  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

