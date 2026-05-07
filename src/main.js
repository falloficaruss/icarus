import "./style.css";
import { portfolioData } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  // ===== 1. Inject About Text =====
  const aboutTextEl = document.getElementById("about-text");
  if (aboutTextEl) aboutTextEl.textContent = portfolioData.about.text;

  // ===== 2. Inject Timeline =====
  const timelineList = document.getElementById("timeline-list");
  if (timelineList) {
    portfolioData.timeline.forEach((item) => {
      const el = document.createElement("div");
      el.className = "timeline-item" + (item.current ? " current" : "");
      el.innerHTML = `
        <div class="timeline-year">${item.year}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-org">${item.organization}</div>
        ${item.description ? `<div class="timeline-desc">${item.description}</div>` : ""}
      `;
      timelineList.appendChild(el);
    });
  }

  // ===== 3. Inject Projects =====
  const projectsGrid = document.getElementById("projects-grid");
  if (projectsGrid) {
    portfolioData.projects.forEach((project) => {
      const card = document.createElement("div");
      card.className = "project-card glass-card";
      card.innerHTML = `
        <span class="project-tag">${project.tag}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" class="project-link">View Details →</a>
      `;
      projectsGrid.appendChild(card);
    });
  }

  // ===== 4. Inject Blogs =====
  const blogsList = document.getElementById("blogs-list");
  if (blogsList) {
    portfolioData.blogs.forEach((blog) => {
      const item = document.createElement("a");
      item.href = blog.link;
      item.className = "blog-item";
      item.innerHTML = `
        <span class="blog-category">${blog.category}</span>
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
      `;
      blogsList.appendChild(item);
    });
  }

  // ===== 5. Scroll Reveal =====
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document
    .querySelectorAll(".fade-in-section")
    .forEach((s) => observer.observe(s));

  // ===== 6. Theme Toggle =====
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    // Restart starfield with new color
    initStarfield();
  });

  // ===== 7. Sidebar Mobile Toggle =====
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Close sidebar when a link is clicked (mobile)
  sidebar.querySelectorAll(".sidebar-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) sidebar.classList.remove("open");
    });
  });

  // ===== 8. Starfield Background =====
  initStarfield();
});

function initStarfield() {
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");

  let w, h, stars;
  const STAR_COUNT = 80; // Subtle — not overdone

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.5 + 0.2,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        pulse: Math.random() * Math.PI * 2, // Phase offset for twinkle
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    stars.forEach((star) => {
      star.x += star.dx;
      star.y += star.dy;
      star.pulse += 0.008;

      // Wrap around
      if (star.x < 0) star.x = w;
      if (star.x > w) star.x = 0;
      if (star.y < 0) star.y = h;
      if (star.y > h) star.y = 0;

      const twinkle = (Math.sin(star.pulse) + 1) / 2; // 0..1
      const alpha = star.alpha * (0.5 + 0.5 * twinkle);

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      if (isDark) {
        ctx.fillStyle = `rgba(248, 248, 242, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(40, 42, 54, ${alpha * 0.25})`;
      }
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();

  window.addEventListener("resize", () => {
    resize();
    createStars();
  });
}
