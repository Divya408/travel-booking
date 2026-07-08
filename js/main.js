/* ==========================================================================
   MERIDIAN — main.js
   Loader, scroll progress, nav behavior, mobile nav, counters, typing effect,
   modal, toast system, AOS init. Shared across every page.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loading screen ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => { if (loader) loader.classList.add('hide'); }, 550);
  });
  // Fallback in case load event already fired
  setTimeout(() => { if (loader) loader.classList.add('hide'); }, 2200);

  /* ---------- AOS init ---------- */
  if (window.AOS) {
    AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' });
  }

  /* ---------- Scroll progress bar ---------- */
  const progress = document.getElementById('scroll-progress');
  const onScrollProgress = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progress) progress.style.width = scrolled + '%';
  };
  document.addEventListener('scroll', onScrollProgress, { passive: true });

  /* ---------- Sticky / solid navbar on scroll ---------- */
  const nav = document.querySelector('.m-nav');
  const onScrollNav = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('solid');
    else nav.classList.remove('solid');
  };
  document.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('back-to-top');
  document.addEventListener('scroll', () => {
    if (!backToTop) return;
    if (window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }, { passive: true });
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Mobile nav panel ---------- */
  const burger = document.querySelector('.m-burger');
  const mobilePanel = document.querySelector('.m-mobile-panel');
  const mobileClose = document.querySelector('.m-mobile-close');
  if (burger && mobilePanel) {
    burger.addEventListener('click', () => mobilePanel.classList.add('open'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobilePanel.classList.remove('open'));
    mobilePanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobilePanel.classList.remove('open')));
  }

  /* ---------- Active nav link (based on current page) ---------- */
  const currentPage = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.m-links a, .m-mobile-panel a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Fade-up reveal on scroll (elements with .fade-up) ---------- */
  const revealEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Departure-board number counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const runCounter = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.floor(eased * target);
        el.textContent = val.toLocaleString() + suffix;
        el.classList.add('tick');
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString() + suffix;
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { runCounter(entry.target); cio.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(c => cio.observe(c));
    } else {
      counters.forEach(runCounter);
    }
  }

  /* ---------- Typing effect (hero headline word) ---------- */
  const typeTarget = document.querySelector('.typewriter');
  if (typeTarget) {
    const words = JSON.parse(typeTarget.dataset.words || '["the world"]');
    let wIndex = 0, cIndex = 0, deleting = false;
    const tick = () => {
      const word = words[wIndex];
      if (!deleting) {
        cIndex++;
        typeTarget.textContent = word.slice(0, cIndex);
        if (cIndex === word.length) { deleting = true; setTimeout(tick, 1400); return; }
      } else {
        cIndex--;
        typeTarget.textContent = word.slice(0, cIndex);
        if (cIndex === 0) { deleting = false; wIndex = (wIndex + 1) % words.length; }
      }
      setTimeout(tick, deleting ? 45 : 85);
    };
    tick();
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- Filter pills (destinations / hotels / packages) ---------- */
  document.querySelectorAll('.filter-row').forEach(row => {
    row.addEventListener('click', (e) => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      row.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.filter;
      const targetGrid = document.querySelector(row.dataset.target);
      if (!targetGrid) return;
      targetGrid.querySelectorAll('[data-cat]').forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Live search filter ---------- */
  document.querySelectorAll('[data-search-target]').forEach(input => {
    input.addEventListener('input', () => {
      const targetGrid = document.querySelector(input.dataset.searchTarget);
      if (!targetGrid) return;
      const q = input.value.trim().toLowerCase();
      targetGrid.querySelectorAll('[data-name]').forEach(card => {
        const match = card.dataset.name.toLowerCase().includes(q);
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ---------- Modal ---------- */
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.querySelector(btn.dataset.modalOpen);
      if (modal) modal.classList.add('open');
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.m-modal-backdrop').classList.remove('open'));
  });
  document.querySelectorAll('.m-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) backdrop.classList.remove('open'); });
  });

  /* ---------- Generic modal forms (e.g. custom itinerary request) ---------- */
  document.querySelectorAll('form[data-toast-success]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(f => { if (!f.value.trim()) valid = false; });
      if (!valid) {
        showToast('Please fill in all fields.', 'error');
        return;
      }
      showToast(form.dataset.toastSuccess);
      form.reset();
      const backdrop = form.closest('.m-modal-backdrop');
      if (backdrop) backdrop.classList.remove('open');
    });
  });

  /* ---------- View Details / Book Now demo buttons -> toast ---------- */
  document.querySelectorAll('[data-demo-toast]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(btn.dataset.demoToast || 'This is a frontend demo — no backend connected.', 'info');
    });
  });

});

/* ---------- Toast helper (global so validation.js can call it) ---------- */
function showToast(message, type = 'success') {
  let stack = document.getElementById('toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.id = 'toast-stack';
    document.body.appendChild(stack);
  }
  const toast = document.createElement('div');
  toast.className = 'toast-m' + (type === 'error' ? ' error' : '');
  const icon = type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  stack.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3800);
}
