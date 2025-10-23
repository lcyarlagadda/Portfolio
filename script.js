// ========== THEME TOGGLE FUNCTIONALITY ==========

// Favicon SVGs for light and dark themes
const faviconLight = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2364748b;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23475569;stop-opacity:1' /%3E%3C/linearGradient%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='2' result='coloredBlur'/%3E%3CfeMerge%3E%3CfeMergeNode in='coloredBlur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Ccircle cx='30' cy='30' r='28' fill='%23f8fafc' stroke='url(%23gradient)' stroke-width='2'/%3E%3Ctext x='30' y='38' font-family='Montserrat, sans-serif' font-size='20' font-weight='700' text-anchor='middle' fill='url(%23gradient)' filter='url(%23glow)'%3ELC%3C/text%3E%3C/svg%3E";

const faviconDark = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2394a3b8;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23cbd5e0;stop-opacity:1' /%3E%3C/linearGradient%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='2' result='coloredBlur'/%3E%3CfeMerge%3E%3CfeMergeNode in='coloredBlur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Ccircle cx='30' cy='30' r='28' fill='%231e293b' stroke='url(%23gradient)' stroke-width='2'/%3E%3Ctext x='30' y='38' font-family='Montserrat, sans-serif' font-size='20' font-weight='700' text-anchor='middle' fill='url(%23gradient)' filter='url(%23glow)'%3ELC%3C/text%3E%3C/svg%3E";

// Function to update favicon based on theme
function updateFavicon(theme) {
  const favicon = document.getElementById('favicon');
  if (favicon) {
    favicon.href = theme === 'dark' ? faviconDark : faviconLight;
  }
}

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateFavicon(currentTheme);

// Theme toggle function
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateFavicon(newTheme);
}

// Add event listeners to both desktop and mobile theme toggle buttons
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
  }
});

// ========== NAVBAR & SIDEBAR ACTIVE HIGHLIGHT ==========

// Helper to update .active on both navbar and mobile sidebar links
function updateActiveLinks(currentId) {
  document.querySelectorAll('.navbar a, .mobile-sidebar-nav a').forEach(link => {
    link.classList.remove('active');
    if (currentId && link.getAttribute('href') === '#' + currentId) {
      link.classList.add('active');
    }
  });
}

// Find current section in view
function getCurrentSection() {
  const scrollPos = window.scrollY + 100;
  const sections = document.querySelectorAll('section[id]');
  let foundId = null;
  
  // Check each section
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    
    // If we're within this section
    if (scrollPos >= top && scrollPos < bottom) {
      foundId = section.id;
      break;
    }
    
    // Special case for the last section (contact) - if we're near the bottom
    if (i === sections.length - 1 && scrollPos >= top - 50) {
      foundId = section.id;
      break;
    }
  }
  
  // If we're at the very bottom of the page, highlight contact
  if (!foundId && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    foundId = 'contact';
  }
  
  return foundId;
}

// On scroll: update highlight and navbar shadow
window.addEventListener('scroll', () => {
  const currentSection = getCurrentSection();
  updateActiveLinks(currentSection);
  
  // Debug: log current section (remove in production)
  // console.log('Current section:', currentSection, 'Scroll position:', window.scrollY);
  
  // Navbar shadow
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// On click: scroll and let scroll event handle the active state
document.querySelectorAll('.navbar a[href^="#"], .mobile-sidebar-nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// On load: set correct highlight
window.addEventListener('load', () => {
  updateActiveLinks(getCurrentSection());
});

// ========== LOADING SCREEN ==========

// Show loading screen for 2 seconds, then animate to main content
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  const themeToggle = document.getElementById('themeToggle');
  
  // Ensure theme toggle is visible immediately
  if (themeToggle) {
    themeToggle.style.display = 'flex';
    themeToggle.style.opacity = '1';
    themeToggle.style.visibility = 'visible';
    themeToggle.style.zIndex = '10000';
  }
  
  // After 2 seconds, hide loading screen and show main content
  setTimeout(() => {
    loadingScreen.classList.add('hide');
    mainContent.classList.add('show');
    
    // Remove loading screen from DOM after animation completes
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 1000); // Match the CSS transition duration
  }, 2000);
});

// Ensure theme toggle is visible immediately on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.style.display = 'flex';
    themeToggle.style.opacity = '1';
    themeToggle.style.visibility = 'visible';
    themeToggle.style.zIndex = '10000';
  }
});


// ========== FADE-UP/LEFT ANIMATIONS ==========

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        // For skill cards and items, also add animate class
        if (entry.target.classList.contains('skill-card') || entry.target.classList.contains('skill-item')) {
          entry.target.classList.add("animate");
        }
      } else {
        entry.target.classList.remove("show");
        // Keep animate class for skill elements once triggered
        if (!entry.target.classList.contains('skill-card') && !entry.target.classList.contains('skill-item')) {
          entry.target.classList.remove("animate");
        }
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
document.querySelectorAll('.fade-left').forEach(el => observer.observe(el));
document.querySelectorAll('.experience-header').forEach(el => observer.observe(el));
document.querySelectorAll('.experience-item').forEach(el => observer.observe(el));

// Add skill cards and skill items to observer
document.querySelectorAll('.skill-card').forEach(el => observer.observe(el));
document.querySelectorAll('.skill-item').forEach(el => observer.observe(el));

// ========== MOBILE SIDEBAR TOGGLE ==========

function toggleMobileSidebar() {
  const sidebar = document.getElementById('mobile-sidebar');
  const overlay = document.getElementById('mobile-sidebar-overlay');
  
  if (sidebar) {
    const isOpen = sidebar.classList.contains('open');
    
    if (isOpen) {
      // Close sidebar
      sidebar.classList.remove('open');
      document.body.style.overflow = '';
      
      // Hide overlay if it exists
      if (overlay) {
        overlay.classList.remove('show');
      }
    } else {
      // Open sidebar
      sidebar.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Show overlay if it exists
      if (overlay) {
        overlay.classList.add('show');
      }
    }
  }
}

// Create overlay element if it doesn't exist
function createMobileSidebarOverlay() {
  if (!document.getElementById('mobile-sidebar-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'mobile-sidebar-overlay';
    overlay.className = 'mobile-sidebar-overlay';
    overlay.onclick = toggleMobileSidebar;
    document.body.appendChild(overlay);
  }
}

// Initialize overlay on page load
document.addEventListener('DOMContentLoaded', createMobileSidebarOverlay);

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

function filterProjects(filter) {
  document.querySelectorAll('.project-card').forEach(card => {
    const categories = card.getAttribute('data-category').split(" ");
    if (filter === 'all') {
      card.style.display = 'block';
    } else if (filter === 'favourites') {
      // Only show projects that have 'favourites' in their categories
      if (categories.includes('favourites')) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    } else {
      // For other filters, show projects that include the filter category
      if (categories.includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    }
  });
}

// Initialize with favorites filter on page load
document.addEventListener('DOMContentLoaded', () => {
  filterProjects('favourites');
});

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterProjects(filter);
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

