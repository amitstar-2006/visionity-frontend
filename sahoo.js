/* ==========================================================================
   1. TAILWIND CONFIGURATION (MIDNIGHT SAPPHIRE & ELECTRIC CYAN PALETTE)
   ========================================================================== */
if (window.tailwind) {
  window.tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['"Escalons Sans"', '"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
          display: ['"Escalons Sans"', '"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
          brand: ['"Escalons Sans"', '"Syncopate"', 'sans-serif'],
          mono: ['"JetBrains Mono"', 'monospace'],
        },
        colors: {
          oceanbrand: {
            300: '#22f3c8', /* Luminous Mint-Cyan Accent */
            400: '#00e5ff', /* Electric Cyan Glow */
            500: '#00b4d8', /* Primary Cyan-Blue */
            600: '#0077ff', /* Deep Electric Blue */
            700: '#0050b3',
            800: '#00357a',
          },
          /* Inverted scale so 900 = Pure White Headings & 50/100 = Deep Midnight Surfaces */
          iceblue: {
            50: '#020917',  /* Deepest Midnight Base */
            100: '#061531', /* Dark Sapphire Surface */
            200: '#102a56', /* Glowing Border / Hairline Divider */
            300: '#1e4582', /* Muted Sapphire Border */
            400: '#6fa3d9', /* Secondary Muted Metallic Blue Text */
            800: '#c4ddf7', /* Soft Ice-Blue Body Text */
            900: '#FFFFFF', /* Crisp Pure White Headings */
          }
        }
      }
    }
  };
}

/* ==========================================================================
   2. INSTANT TAB SWITCH ENGINE (With Smooth Entrance Animation Reset)
   ========================================================================== */
function triggerTabSwitch(targetId) {
  const panels = document.querySelectorAll('.page-tab-panel');
  const navTriggers = document.querySelectorAll('[data-nav-tab]');
  const hudLinks = document.querySelectorAll('.hud-dot-link');

  // Immediately jump to top before toggling to avoid scroll offset jumps
  window.scrollTo(0, 0);

  // 1. Switch panel visibility & restart the reveal animation cleanly
  panels.forEach(panel => {
    const isTarget = (panel.id === targetId || panel.getAttribute('data-tab-panel') === targetId);
    if (isTarget) {
      // Force reflow so CSS entrance animation reliably replays on every click
      panel.classList.remove('active');
      void panel.offsetWidth;
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // 2. Synchronize navigation bars
  navTriggers.forEach(trigger => {
    if (trigger.getAttribute('data-nav-tab') === targetId) {
      trigger.setAttribute('aria-current', 'page');
    } else {
      trigger.removeAttribute('aria-current');
    }
  });

  // 3. Update HUD dot active states
  hudLinks.forEach(link => {
    const dot = link.querySelector('.hud-dot-indicator');
    const isCurrent = (link.getAttribute('data-target') === targetId || link.getAttribute('data-nav-tab') === targetId);
    if (dot) {
      if (isCurrent) {
        dot.className = "hud-dot-indicator w-2.5 h-2.5 rounded-full bg-oceanbrand-400 scale-125 ring-4 ring-oceanbrand-400/30 transition-all duration-300 shadow-[0_0_10px_#00e5ff]";
      } else {
        dot.className = "hud-dot-indicator w-2.5 h-2.5 rounded-full bg-iceblue-400/50 transition-all duration-300";
      }
    }
  });

  // 4. Close mobile drawer overlay if visible
  const overlay = document.getElementById('ios-menu-overlay');
  if (overlay && !overlay.classList.contains('hidden')) {
    overlay.classList.add('hidden');
    overlay.classList.add('opacity-0');
  }
}

/* ==========================================================================
   3. MODAL & LEAD SUBMISSION HANDLERS
   ========================================================================== */
function handleLeadSubmit(event) {
  event.preventDefault();
  
  const randomRef = 'VIS-' + Math.floor(100000 + Math.random() * 900000);
  const refCodeEl = document.getElementById('lead-ref-code');
  if (refCodeEl) refCodeEl.textContent = randomRef;

  const modal = document.getElementById('success-modal');
  const modalCard = document.getElementById('modal-card');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (modalCard) {
        modalCard.classList.remove('scale-95');
        modalCard.classList.add('scale-100');
      }
    }, 10);
  }
}

function closeSuccessModal() {
  const modal = document.getElementById('success-modal');
  const modalCard = document.getElementById('modal-card');
  if (modal) {
    modal.classList.add('opacity-0');
    if (modalCard) {
      modalCard.classList.remove('scale-100');
      modalCard.classList.add('scale-95');
    }
    setTimeout(() => {
      modal.classList.add('hidden');
      const form = document.getElementById('lead-enquiry-form');
      if (form) form.reset();
    }, 300);
  }
}

/* ==========================================================================
   4. AMBIENT CYAN PARTICLE & RIPPLE CANVAS ENGINE
   ========================================================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('liquid-ripple-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const orbs = Array.from({ length: 18 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 1.2 + Math.random() * 2.5,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    alpha: 0.2 + Math.random() * 0.55
  }));

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    orbs.forEach(o => {
      o.x += o.vx;
      o.y += o.vy;
      if (o.x < 0) o.x = width;
      if (o.x > width) o.x = 0;
      if (o.y < 0) o.y = height;
      if (o.y > height) o.y = 0;

      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${o.alpha})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00e5ff';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ==========================================================================
   5. EVENT LISTENERS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initCyberCanvas();

  // Navigation tabs
  document.querySelectorAll('[data-nav-tab]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-nav-tab');
      triggerTabSwitch(targetId);
    });
  });

  // Mobile drawer open
  const menuTrigger = document.getElementById('menu-popup-trigger');
  const menuOverlay = document.getElementById('ios-menu-overlay');
  if (menuTrigger && menuOverlay) {
    menuTrigger.addEventListener('click', () => {
      menuOverlay.classList.remove('hidden');
      setTimeout(() => menuOverlay.classList.remove('opacity-0'), 10);
    });
  }

  // Mobile drawer close
  const menuClose = document.getElementById('menu-popup-close');
  if (menuClose && menuOverlay) {
    menuClose.addEventListener('click', () => {
      menuOverlay.classList.add('opacity-0');
      setTimeout(() => menuOverlay.classList.add('hidden'), 300);
    });
  }

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scroll-to-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll progress & back-to-top visibility
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) progressBar.style.width = `${progress}%`;

    const pctText = document.getElementById('scroll-pct-text');
    if (pctText) pctText.textContent = `${Math.round(progress)}%`;

    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      }
    }
  });

  // Hero search bar bindings
  const heroSearchInput = document.getElementById('hero-search-input');
  if (heroSearchInput) {
    heroSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') triggerTabSwitch('services');
    });
  }

  const heroSearchBtn = document.getElementById('hero-search-btn');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      triggerTabSwitch('services');
    });
  }

  // Lead Enquiry Form
  const leadForm = document.getElementById('lead-enquiry-form');
  if (leadForm) {
    leadForm.addEventListener('submit', handleLeadSubmit);
  }

  // Success modal done button
  const modalDoneBtn = document.getElementById('modal-done-btn');
  if (modalDoneBtn) {
    modalDoneBtn.addEventListener('click', closeSuccessModal);
  }

  // Dynamic Year
  const yearHolder = document.getElementById('year-holder');
  if (yearHolder) {
    yearHolder.textContent = new Date().getFullYear();
  }
});