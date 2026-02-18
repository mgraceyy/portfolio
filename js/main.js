// ===========================
// Always start at top on reload
// ===========================
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// ===========================
// Dark mode toggle
// ===========================
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===========================
// Navigation scroll effect
// ===========================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// ===========================
// Mobile menu toggle
// ===========================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// ===========================
// Scroll progress bar
// ===========================
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ===========================
// Active nav link on scroll
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });

// ===========================
// Staggered fade-in on scroll
// ===========================
const animElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-scale');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Find siblings in same parent grid for staggering
      const parent = entry.target.parentElement;
      const siblings = parent.querySelectorAll('.fade-in, .fade-in-left, .fade-in-scale');
      let index = 0;

      siblings.forEach((sib, i) => {
        if (sib === entry.target) index = i;
      });

      // Only stagger if in a grid context
      if (siblings.length > 1) {
        entry.target.style.transitionDelay = (index * 0.1) + 's';
      }

      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

animElements.forEach(el => {
  observer.observe(el);
});

// ===========================
// Video hover to play / click to toggle
// ===========================
document.querySelectorAll('.work-card-video').forEach(container => {
  const video = container.querySelector('video');

  container.addEventListener('mouseenter', () => {
    video.play();
    container.classList.add('playing');
  });

  container.addEventListener('mouseleave', () => {
    video.pause();
    container.classList.remove('playing');
  });

  container.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      container.classList.add('playing');
    } else {
      video.pause();
      container.classList.remove('playing');
    }
  });
});

// ===========================
// Card tilt effect
// ===========================
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===========================
// Lightbox
// ===========================
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('[data-lightbox]').forEach(el => {
  el.addEventListener('click', (e) => {
    const img = el.tagName === 'IMG' ? el : el.querySelector('img');
    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===========================
// Button ripple position
// ===========================
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty('--ripple-x', x + '%');
    btn.style.setProperty('--ripple-y', y + '%');
  });
});

// ===========================
// Spotify album art via oEmbed
// ===========================
document.querySelectorAll('img[data-spotify-id]').forEach(async img => {
  const id = img.dataset.spotifyId;
  try {
    const res = await fetch(
      `https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Ftrack%2F${id}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.thumbnail_url) img.src = data.thumbnail_url;
    }
  } catch (e) { /* keep YouTube fallback */ }
});

// ===========================
// Parallax on hero (subtle)
// ===========================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    const offset = scrollY * 0.3;
    hero.style.transform = `translateY(${offset}px)`;
    hero.style.opacity = 1 - (scrollY / window.innerHeight) * 0.5;
  }
}, { passive: true });
