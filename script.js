/**
 * ====================================================================
 * EEE-15 UNIVERSITY BATCH WEBSITE - SCRIPT ENGINE
 * ====================================================================
 * 
 * Features:
 * 1. 100% Dynamic Text Binding from `window.SITE_CONFIG` (index.html)
 * 2. High-Performance Gallery Engine (Handles 100+ Photos with Load More)
 * 3. Cinematic Slideshow with Animated Progress Bar & Touch Controls
 * 4. Touch-Friendly Lightbox Modal (Keyboard + Mobile Swipe)
 * 5. Responsive Mobile Navigation Menu
 * ====================================================================
 */

(function () {
  'use strict';

  // Fallback defaults if SITE_CONFIG is missing
  const config = window.SITE_CONFIG || {
    batchName: "EEE-15",
    department: "Department of Electrical and Electronic Engineering",
    departmentShort: "Dept. of EEE",
    university: "Jashore University of Science and Technology (JUST)",
    universityShort: "JUST, Bangladesh",
    session: "2025-26",
    totalMembers: 37,
    facebookPageUrl: "",
    developerName: "Md Mejbahul Haq",
    developerUrl: "https://mejbahul19.github.io/",
    heroBadgeText: "Official Batch Archive",
    heroTitleItalic: "Classroom to Campus:",
    heroTitleSub: "Our Lifelong Story",
    heroDescription: "Welcome to the official memory archive of EEE-15.",
    heroBtnGalleryText: "Browse Memories",
    heroBtnAboutText: "Batch Overview",
    galleryBadgeText: "Visual Archive",
    galleryTitle: "Memories & Photo Gallery",
    gallerySubtitle: "Classroom lectures, lab experiments, campus hangouts, and picnic memories.",
    emptyCategoryMessage: "No memories added to this category yet. New photos coming soon!",
    aboutBadgeText: "Batch Identity",
    aboutTitle: "About EEE-15",
    aboutDescription: "A cohort of 37 passionate students at JUST, Bangladesh.",
    categories: [
      { id: "all", label: "All Photos" },
      { id: "campus", label: "Campus Life & Adda" },
      { id: "picnic", label: "Batch Picnic" },
      { id: "classroom", label: "Classroom & Labs" }
    ],
    gallery: []
  };

  // State Management (Chunked rendering for 100+ photos performance)
  const PAGE_SIZE = 12; // Initial photos to show for instant loading
  const SLIDE_DURATION = 4800; // 4.8 seconds per slide

  const state = {
    currentCategory: 'all',
    filteredGallery: [...(config.gallery || [])],
    renderedCount: PAGE_SIZE,
    activeSlideIndex: 0,
    slideshowTimer: null,
    slideshowPhotos: [],
    isSlideshowPaused: false,
    progressStartTime: 0,
    progressRaf: null,
    lightboxIndex: 0,
    touchStartX: 0,
    touchEndX: 0
  };

  /* ====================================================================
     1. INITIALIZATION & DATA BINDING
     ==================================================================== */
  function init() {
    bindConfigData();
    setupHeroSlideshow();
    setupGallerySection();
    setupMobileNav();
    setupScrollSpy();
  }

  /**
   * Binds every single editable text from index.html into the DOM
   */
  function bindConfigData() {
    // Document Title
    document.title = `${config.batchName} | ${config.universityShort}`;

    // Header
    setElementText('nav-brand-title', config.batchName);
    setElementText('nav-brand-subtitle', config.universityShort);
    setElementText('nav-total-members', `${config.totalMembers} Members`);

    // Hero Section
    setElementText('hero-badge-dept', config.departmentShort);
    setElementText('hero-badge-univ', config.universityShort);
    setElementText('hero-session-tag', `Session: ${config.session}`);
    setElementText('hero-batch-title', config.batchName);
    setElementText('hero-title-italic', config.heroTitleItalic || "Classroom to Campus:");
    setElementText('hero-title-sub', config.heroTitleSub || "Our Lifelong Story");
    setElementText('hero-dept-name', config.department);
    setElementText('hero-univ-name', config.university);
    setElementText('hero-description', config.heroDescription);

    // Hero Buttons
    const heroBtnGallery = document.getElementById('hero-btn-gallery');
    if (heroBtnGallery && config.heroBtnGalleryText) {
      heroBtnGallery.textContent = config.heroBtnGalleryText;
    }
    const heroBtnAbout = document.getElementById('hero-btn-about');
    if (heroBtnAbout && config.heroBtnAboutText) {
      heroBtnAbout.innerHTML = `${escapeHtml(config.heroBtnAboutText)} (<span id="hero-btn-member-count">${config.totalMembers} Members</span>)`;
    }

    // Hero Stats
    setElementText('stat-members-count', config.totalMembers.toString());
    setElementText('stat-session', config.session);
    setElementText('stat-photos-count', (config.gallery || []).length.toString());

    // Gallery Section
    setElementText('gallery-badge-text', config.galleryBadgeText || "Visual Archive");
    setElementText('gallery-title', config.galleryTitle || "Memories & Photo Gallery");
    setElementText('gallery-subtitle', config.gallerySubtitle || "Classroom lectures, lab experiments, campus hangouts, and picnic memories.");

    // About Section
    setElementText('about-badge-text', config.aboutBadgeText || "Batch Identity");
    setElementText('about-title', config.aboutTitle || `About ${config.batchName}`);
    setElementText('about-batch-name', config.batchName);
    setElementText('about-members-count', `${config.totalMembers} Members`);
    setElementText('about-session', config.session);
    setElementText('about-dept-name', config.departmentShort);
    setElementText('about-univ-name', config.universityShort);

    const aboutDescEl = document.getElementById('about-description');
    if (aboutDescEl && config.aboutDescription) {
      aboutDescEl.textContent = config.aboutDescription;
    }

    // Footer
    setElementText('footer-batch-name', config.batchName);
    setElementText('footer-dept-name', config.department);
    setElementText('footer-univ-name', config.university);
    setElementText('footer-session', config.session);
    setElementText('footer-members-count', config.totalMembers.toString());
    setElementText('footer-copy-batch', config.batchName);
    setElementText('current-year', new Date().getFullYear().toString());

    // Developer link
    const devLink = document.getElementById('footer-dev-link');
    if (devLink) {
      devLink.textContent = config.developerName;
      devLink.href = config.developerUrl;
    }

    // Facebook Buttons
    setupFacebookButtons();
  }

  function setElementText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined) {
      el.textContent = text;
    }
  }

  function setupFacebookButtons() {
    const fbUrl = config.facebookPageUrl ? config.facebookPageUrl.trim() : "";
    const navFb = document.getElementById('nav-fb-btn');
    const heroFb = document.getElementById('hero-fb-btn');
    const footerFb = document.getElementById('footer-fb-wrap');
    const footerFbBtn = document.getElementById('footer-fb-btn');

    if (fbUrl) {
      if (navFb) {
        navFb.href = fbUrl;
        navFb.style.display = 'inline-flex';
      }
      if (heroFb) {
        heroFb.href = fbUrl;
        heroFb.style.display = 'inline-flex';
      }
      if (footerFb && footerFbBtn) {
        footerFbBtn.href = fbUrl;
        footerFb.style.display = 'block';
      }
    } else {
      if (navFb) navFb.style.display = 'none';
      if (heroFb) heroFb.style.display = 'none';
      if (footerFb) footerFb.style.display = 'none';
    }
  }

  /* ====================================================================
     2. HERO PHOTO SLIDESHOW (ENHANCED EFFECTS)
     ==================================================================== */
  function setupHeroSlideshow() {
    state.slideshowPhotos = (config.gallery || []).filter(item => item.inSlideshow === true);

    if (state.slideshowPhotos.length === 0) {
      state.slideshowPhotos = (config.gallery || []).slice(0, 5);
    }

    const track = document.getElementById('slideshow-track');
    const indicators = document.getElementById('slide-indicators');
    const prevBtn = document.getElementById('slide-prev');
    const nextBtn = document.getElementById('slide-next');
    const wrapper = document.getElementById('hero-slideshow');

    if (!track || state.slideshowPhotos.length === 0) return;

    // Render slide items
    track.innerHTML = state.slideshowPhotos.map((item, index) => {
      const activeClass = index === 0 ? 'active' : '';
      return `
        <div class="slide-item ${activeClass}" data-slide-index="${index}">
          <img class="slide-bg-blur" src="${escapeHtml(item.src)}" alt="" aria-hidden="true" onerror="this.style.display='none'">
          <img class="slide-image" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || item.title)}" onerror="handleBrokenImage(this)">
        </div>
      `;
    }).join('');

    // Indicators
    if (indicators) {
      indicators.innerHTML = state.slideshowPhotos.map((_, index) => {
        const activeClass = index === 0 ? 'active' : '';
        return `
          <button class="slide-dot ${activeClass}" data-index="${index}" role="tab" aria-label="Go to slide ${index + 1}"></button>
        `;
      }).join('');

      indicators.querySelectorAll('.slide-dot').forEach(dot => {
        dot.addEventListener('click', function () {
          const targetIndex = parseInt(this.getAttribute('data-index'), 10);
          goToSlide(targetIndex);
          resetSlideshowTimer();
        });
      });
    }

    // Prev / Next button listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        resetSlideshowTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        resetSlideshowTimer();
      });
    }

    updateSlideCaption(0);
    startSlideshowTimer();

    // Hover & touch controls
    if (wrapper) {
      wrapper.addEventListener('mouseenter', pauseSlideshow);
      wrapper.addEventListener('mouseleave', resumeSlideshow);

      wrapper.addEventListener('touchstart', function (e) {
        state.touchStartX = e.changedTouches[0].screenX;
        pauseSlideshow();
      }, { passive: true });

      wrapper.addEventListener('touchend', function (e) {
        state.touchEndX = e.changedTouches[0].screenX;
        handleSlideshowSwipe();
        resumeSlideshow();
      }, { passive: true });
    }
  }

  function goToSlide(index) {
    const total = state.slideshowPhotos.length;
    if (total === 0) return;

    state.activeSlideIndex = (index + total) % total;

    const slides = document.querySelectorAll('.slide-item');
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === state.activeSlideIndex);
    });

    const dots = document.querySelectorAll('.slide-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === state.activeSlideIndex);
    });

    updateSlideCaption(state.activeSlideIndex);
    animateProgressBar();
  }

  function nextSlide() {
    goToSlide(state.activeSlideIndex + 1);
  }

  function prevSlide() {
    goToSlide(state.activeSlideIndex - 1);
  }

  function updateSlideCaption(index) {
    const photo = state.slideshowPhotos[index];
    if (!photo) return;

    const catTag = document.getElementById('slide-category-tag');
    const titleText = document.getElementById('slide-title-text');

    const categoryObj = (config.categories || []).find(c => c.id === photo.category);
    const categoryLabel = categoryObj ? categoryObj.label : photo.category;

    if (catTag) catTag.textContent = categoryLabel;
    if (titleText) titleText.textContent = photo.title || 'Batch Memory';
  }

  function animateProgressBar() {
    const bar = document.getElementById('slideshow-progress-bar');
    if (!bar) return;

    cancelAnimationFrame(state.progressRaf);
    state.progressStartTime = performance.now();

    function step(now) {
      if (state.isSlideshowPaused) {
        state.progressStartTime += (now - state.lastNow || 0);
      }
      state.lastNow = now;

      const elapsed = now - state.progressStartTime;
      const progress = Math.min(elapsed / SLIDE_DURATION, 1);
      bar.style.width = `${progress * 100}%`;

      if (progress < 1) {
        state.progressRaf = requestAnimationFrame(step);
      }
    }

    state.progressRaf = requestAnimationFrame(step);
  }

  function startSlideshowTimer() {
    if (state.slideshowPhotos.length <= 1) return;
    clearInterval(state.slideshowTimer);
    animateProgressBar();
    state.slideshowTimer = setInterval(nextSlide, SLIDE_DURATION);
  }

  function resetSlideshowTimer() {
    clearInterval(state.slideshowTimer);
    if (!state.isSlideshowPaused) {
      startSlideshowTimer();
    }
  }

  function pauseSlideshow() {
    state.isSlideshowPaused = true;
    clearInterval(state.slideshowTimer);
  }

  function resumeSlideshow() {
    state.isSlideshowPaused = false;
    startSlideshowTimer();
  }

  function handleSlideshowSwipe() {
    const diff = state.touchEndX - state.touchStartX;
    if (diff > 45) prevSlide();
    else if (diff < -45) nextSlide();
  }

  /* ====================================================================
     3. EVENT & CAMPUS GALLERY (OPTIMIZED FOR 100+ PHOTOS)
     ==================================================================== */
  function setupGallerySection() {
    renderCategoryFilters();
    renderGalleryGrid();
    setupLightbox();
    setupLoadMoreButton();
  }

  function renderCategoryFilters() {
    const filterBar = document.getElementById('gallery-filters');
    if (!filterBar) return;

    const categories = config.categories || [];
    const allPhotos = config.gallery || [];

    filterBar.innerHTML = categories.map(cat => {
      const activeClass = cat.id === state.currentCategory ? 'active' : '';
      let count = 0;
      if (cat.id === 'all') {
        count = allPhotos.length;
      } else {
        count = allPhotos.filter(item => item.category === cat.id).length;
      }

      return `
        <button class="filter-btn ${activeClass}" data-category="${escapeHtml(cat.id)}" role="tab" aria-selected="${cat.id === state.currentCategory}">
          <span>${escapeHtml(cat.label)}</span>
          <span class="filter-count">${count}</span>
        </button>
      `;
    }).join('');

    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const catId = this.getAttribute('data-category');
        setGalleryFilter(catId);
      });
    });
  }

  function setGalleryFilter(catId) {
    state.currentCategory = catId;
    state.renderedCount = PAGE_SIZE; // Reset pagination for category

    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      const isActive = btn.getAttribute('data-category') === catId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive.toString());
    });

    if (catId === 'all') {
      state.filteredGallery = [...(config.gallery || [])];
    } else {
      state.filteredGallery = (config.gallery || []).filter(item => item.category === catId);
    }

    renderGalleryGrid();
  }

  /**
   * Renders photos with chunked pagination for fast performance with 100+ items
   */
  function renderGalleryGrid() {
    const grid = document.getElementById('gallery-grid');
    const emptyMsg = document.getElementById('gallery-empty-message');
    const loadMoreContainer = document.getElementById('load-more-container');
    const loadMoreCount = document.getElementById('load-more-count');

    if (!grid) return;

    const total = state.filteredGallery.length;

    // Handle empty state gracefully (Zero code jargon)
    if (total === 0) {
      grid.innerHTML = '';
      if (emptyMsg) {
        emptyMsg.style.display = 'block';
        const emptyDesc = document.getElementById('empty-state-desc');
        if (emptyDesc && config.emptyCategoryMessage) {
          emptyDesc.textContent = config.emptyCategoryMessage;
        }
      }
      if (loadMoreContainer) loadMoreContainer.style.display = 'none';
      return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    // Slice photos for current page chunk
    const currentChunk = state.filteredGallery.slice(0, state.renderedCount);

    grid.innerHTML = currentChunk.map((photo, index) => {
      const catObj = (config.categories || []).find(c => c.id === photo.category);
      const catLabel = catObj ? catObj.label : photo.category;
      const dateText = photo.date ? `<span class="gallery-date">${escapeHtml(photo.date)}</span>` : '';

      return `
        <div class="gallery-item animate-fade" data-index="${index}" tabindex="0" role="button" aria-label="View ${escapeHtml(photo.title || 'photo')}">
          <div class="gallery-media">
            <img 
              src="${escapeHtml(photo.src)}" 
              alt="${escapeHtml(photo.alt || photo.title || 'Batch photo')}" 
              loading="lazy" 
              decoding="async"
              onerror="handleBrokenImage(this)"
            >
            <div class="gallery-overlay" aria-hidden="true">
              <div class="gallery-view-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h6v6"></path>
                  <path d="M9 21H3v-6"></path>
                  <path d="M21 3l-7 7"></path>
                  <path d="M3 21l7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="gallery-info">
            <div class="gallery-meta">
              <span class="gallery-cat-badge">${escapeHtml(catLabel)}</span>
              ${dateText}
            </div>
            <h3 class="gallery-title">${escapeHtml(photo.title || 'Campus Moment')}</h3>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events to open Lightbox
    grid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-index'), 10);
        openLightbox(idx);
      });

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(this.getAttribute('data-index'), 10);
          openLightbox(idx);
        }
      });
    });

    // Manage Load More button (if > 12 photos exist)
    if (loadMoreContainer) {
      if (total > state.renderedCount) {
        loadMoreContainer.style.display = 'flex';
        const remaining = total - state.renderedCount;
        if (loadMoreCount) {
          loadMoreCount.textContent = `+${remaining} more`;
        }
      } else {
        loadMoreContainer.style.display = 'none';
      }
    }
  }

  function setupLoadMoreButton() {
    const btn = document.getElementById('load-more-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      state.renderedCount += PAGE_SIZE;
      renderGalleryGrid();
    });
  }

  /* ====================================================================
     4. LIGHTBOX MODAL (HANDLES 100+ PHOTOS SMOOTHLY)
     ==================================================================== */
  function setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const backdrop = document.getElementById('lightbox-backdrop');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!modal) return;

    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        navigateLightbox(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        navigateLightbox(1);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') navigateLightbox(-1);
      else if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    const content = modal.querySelector('.lightbox-content');
    if (content) {
      content.addEventListener('touchstart', function (e) {
        state.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      content.addEventListener('touchend', function (e) {
        state.touchEndX = e.changedTouches[0].screenX;
        const diff = state.touchEndX - state.touchStartX;
        if (diff > 50) navigateLightbox(-1);
        if (diff < -50) navigateLightbox(1);
      }, { passive: true });
    }
  }

  function openLightbox(index) {
    if (state.filteredGallery.length === 0) return;
    state.lightboxIndex = index;
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    updateLightboxContent();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('lightbox-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    const total = state.filteredGallery.length;
    if (total === 0) return;
    state.lightboxIndex = (state.lightboxIndex + direction + total) % total;
    updateLightboxContent();
  }

  function updateLightboxContent() {
    const photo = state.filteredGallery[state.lightboxIndex];
    if (!photo) return;

    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    const title = document.getElementById('lightbox-title');
    const category = document.getElementById('lightbox-category');

    if (img) {
      img.src = photo.src;
      img.alt = photo.alt || photo.title || 'Enlarged photo';
    }

    if (counter) {
      counter.textContent = `Photo ${state.lightboxIndex + 1} of ${state.filteredGallery.length}`;
    }

    if (title) title.textContent = photo.title || 'Batch Memory';

    if (category) {
      const catObj = (config.categories || []).find(c => c.id === photo.category);
      category.textContent = catObj ? catObj.label : photo.category;
    }
  }

  /* ====================================================================
     5. MOBILE NAVIGATION DRAWER
     ==================================================================== */
  function setupMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', (!expanded).toString());
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
    });

    menu.querySelectorAll('.nav-link, .btn').forEach(link => {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        menu.classList.remove('active');
      });
    });

    document.addEventListener('click', function (e) {
      if (menu.classList.contains('active') && !menu.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        menu.classList.remove('active');
      }
    });
  }

  /* ====================================================================
     6. SCROLL SPY
     ==================================================================== */
  function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', function () {
      let currentSection = '';
      const scrollPosition = window.scrollY + 120;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentSection = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
          link.classList.add('active');
        } else if (href && href.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    }, { passive: true });
  }

  /* ====================================================================
     7. UTILITIES
     ==================================================================== */
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  window.handleBrokenImage = function (imgElement) {
    imgElement.onerror = null;
    imgElement.style.padding = '3rem 1rem';
    imgElement.style.backgroundColor = '#141715';
    imgElement.alt = 'Image not found';
    imgElement.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23141715%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20fill%3D%22%23E06A3B%22%3E%E2%9A%A0%20Image%20Not%20Found%3C%2Ftext%3E%3C%2Fsvg%3E";
  };

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
