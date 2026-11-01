/* ========================================
   Portfolio - Global Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  initMobileNav();
  initTimelineDrag();
  initLightbox();
});

/* ---------- Inject Navigation ---------- */
function injectNav() {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  const currentPath = window.location.pathname;
  const getActive = (page) => {
    if (currentPath.endsWith(page) || (page === 'index.html' && currentPath.endsWith('/'))) {
      return 'active';
    }
    return '';
  };

  placeholder.innerHTML = `
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="nav-logo">Andy</a>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="nav-links">
          <li><a href="index.html" class="${getActive('index.html')}">Home</a></li>
          <li><a href="patents.html" class="${getActive('patents.html')}">Patents</a></li>
          <li><a href="projects.html" class="${getActive('projects.html')}">Projects</a></li>
          <li><a href="hobbies.html" class="${getActive('hobbies.html')}">Hobbies</a></li>
        </ul>
      </div>
    </nav>
  `;
}

/* ---------- Inject Footer ---------- */
function injectFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  placeholder.innerHTML = `
    <footer class="footer">
      <div class="container">
        <p class="footer-copy">&copy; ${new Date().getFullYear()} Andy. All rights reserved.</p>
      </div>
    </footer>
  `;
}

/* ---------- Mobile Nav Toggle ---------- */
function initMobileNav() {
  // Use event delegation since nav is injected dynamically
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('#nav-toggle');
    if (!toggle) return;

    const links = document.getElementById('nav-links');
    if (links) {
      links.classList.toggle('open');
    }
  });

  // Close nav when clicking a link (mobile)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('#nav-links a');
    if (!link) return;

    const links = document.getElementById('nav-links');
    if (links) {
      links.classList.remove('open');
    }
  });
}

/* ---------- Horizontal Timeline — drag to scroll ---------- */
function initTimelineDrag() {
  document.querySelectorAll('.timeline-h').forEach((el) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    el.addEventListener('mousedown', (e) => {
      isDown = true;
      el.classList.add('grabbing');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    const stop = () => {
      isDown = false;
      el.classList.remove('grabbing');
    };

    el.addEventListener('mouseleave', stop);
    el.addEventListener('mouseup', stop);

    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX);
    });
  });
}

/* ---------- Lightbox — click an image to view it fullscreen ---------- */
function initLightbox() {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <img src="" alt="">
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  const open = (src, alt) => {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    img.removeAttribute('src');
  };

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  document.querySelectorAll('img').forEach((el) => {
    if (el.closest('.project-card')) return; // card covers navigate instead
    if (el.closest('.lightbox')) return;
    el.setAttribute('data-lightbox', '');
    el.addEventListener('click', () => open(el.src, el.alt));
  });
}
