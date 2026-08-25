/* ========================================
   Portfolio - Global Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  initMobileNav();
  initTimelineDrag();
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
          <li><a href="projects.html" class="${getActive('projects.html')}">Projects</a></li>
          <li><a href="about.html" class="${getActive('about.html')}">About</a></li>
          <li><a href="hobbies.html" class="${getActive('hobbies.html')}">Hobbies</a></li>
          <li><a href="patents.html" class="${getActive('patents.html')}">Patents</a></li>
          <li><a href="contact.html" class="${getActive('contact.html')}">Contact</a></li>
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
        <div class="footer-social">
          <a href="https://github.com/AndyYe2009" target="_blank" rel="noopener">GitHub</a>
          <a href="mailto:13818594117@139.com">Email</a>
        </div>
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
