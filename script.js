/**
 * @file script.js
 * @description Premium micro-interactions, scroll animations, and dual theme management
 * for the minimal portfolio of @falloficaruss.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- THEME MANAGEMENT ---
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve previous preference or check OS settings
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Apply theme to the document
  const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Initialize Theme
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  // Toggle Theme Event Handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = htmlElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // --- SCROLL ENTRANCE REVEAL ANIMATION ---
  const sections = document.querySelectorAll('.content-section');
  
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Trigger animation once
      }
    });
  }, revealOptions);

  sections.forEach(section => {
    revealObserver.observe(section);
  });

  // --- SCROLL SPY ACTIVE NAV STATE ---
  const navLinks = document.querySelectorAll('.nav-link');
  
  const spyOptions = {
    threshold: 0.3,
    rootMargin: '-10% 0px -60% 0px'
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, spyOptions);

  sections.forEach(section => {
    spyObserver.observe(section);
  });

  // Smooth local navigation click handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL hash without jumping page
        history.pushState(null, null, targetId);
      }
    });
  });

  // --- PREMIUM DEVELOPER CONSOLE WELCOME MESSAGE ---
  console.log(
    `%c👋 Hello, Inspector! %c\n\nThis minimal, clean portfolio was built for @falloficaruss.\nOptimized for pure CSS rendering, extreme speeds, and accessibility.\n\n✨ Github: https://github.com/falloficaruss`,
    "font-family: system-ui, sans-serif; font-size: 1.25rem; font-weight: bold; color: #cca485;",
    "font-family: system-ui, sans-serif; font-size: 0.95rem; color: inherit;"
  );
});
