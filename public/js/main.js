/* Cerebyte Technologies — site interactions. No dependencies. */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Mega menu ---------- */
  function initMegaMenu() {
    const triggers = $$('[data-mega-trigger]');
    if (!triggers.length) return;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let closeTimer;
    let hoverOpenedAt = 0;

    const panelFor = (t) => document.getElementById(t.getAttribute('aria-controls'));
    const close = (t) => { t.setAttribute('aria-expanded', 'false'); panelFor(t).hidden = true; };
    const closeAll = (except) => triggers.forEach((t) => t !== except && close(t));
    const open = (t) => { closeAll(t); t.setAttribute('aria-expanded', 'true'); panelFor(t).hidden = false; };

    triggers.forEach((t) => {
      t.addEventListener('click', () => {
        const isOpen = t.getAttribute('aria-expanded') === 'true';
        // A click that lands right after hover opened the menu should keep it open, not close it.
        if (isOpen && Date.now() - hoverOpenedAt < 500) return;
        isOpen ? close(t) : open(t);
      });

      if (canHover) {
        const item = t.parentElement;
        item.addEventListener('mouseenter', () => {
          clearTimeout(closeTimer);
          if (t.getAttribute('aria-expanded') !== 'true') { open(t); hoverOpenedAt = Date.now(); }
        });
        item.addEventListener('mouseleave', () => { closeTimer = setTimeout(() => close(t), 160); });
      }

      panelFor(t).addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { close(t); t.focus(); }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const openTrigger = triggers.find((t) => t.getAttribute('aria-expanded') === 'true');
      if (openTrigger) { close(openTrigger); openTrigger.focus(); }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.main-nav__item')) closeAll();
    });

    // Close when keyboard focus leaves the open menu item.
    document.addEventListener('focusin', (e) => {
      triggers.forEach((t) => {
        if (t.getAttribute('aria-expanded') === 'true' && !t.parentElement.contains(e.target)) close(t);
      });
    });
  }

  /* ---------- Mobile navigation ---------- */
  function initMobileNav() {
    const toggle = $('[data-menu-toggle]');
    const panel = $('[data-mobile-nav]');
    if (!toggle || !panel) return;

    const header = toggle.closest('[data-header]');
    const set = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      // Fill exactly the space below the header, whether or not the announcement bar is visible.
      if (open) panel.style.height = `${Math.max(200, window.innerHeight - header.getBoundingClientRect().bottom)}px`;
      panel.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => set(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { set(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 1101px)').addEventListener('change', (e) => e.matches && set(false));
    panel.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  }

  /* ---------- Tabs (engagement models) ---------- */
  function initTabs() {
    $$('[data-tabs]').forEach((root) => {
      const tabs = $$('[role="tab"]', root);
      const select = (tab, focus) => {
        tabs.forEach((t) => {
          const selected = t === tab;
          t.setAttribute('aria-selected', String(selected));
          t.tabIndex = selected ? 0 : -1;
          document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
        });
        if (focus) tab.focus();
      };
      tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => select(tab));
        tab.addEventListener('keydown', (e) => {
          const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
          if (e.key in keys) {
            e.preventDefault();
            select(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true);
          } else if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
          else if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
        });
      });
    });
  }

  /* ---------- Testimonial carousel ---------- */
  function initCarousel() {
    $$('[data-carousel]').forEach((root) => {
      const slides = $$('[data-slide]', root);
      const current = $('[data-current]', root);
      let index = 0;
      const show = (i) => {
        index = (i + slides.length) % slides.length;
        slides.forEach((s, n) => {
          const active = n === index;
          s.classList.toggle('is-active', active);
          s.inert = !active;
          if (active) s.removeAttribute('aria-hidden'); else s.setAttribute('aria-hidden', 'true');
        });
        current.textContent = String(index + 1);
      };
      $('[data-prev]', root).addEventListener('click', () => show(index - 1));
      $('[data-next]', root).addEventListener('click', () => show(index + 1));
      root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') show(index - 1);
        if (e.key === 'ArrowRight') show(index + 1);
      });
    });
  }

  /* ---------- Tech strip pause ---------- */
  function initMarquee() {
    const marquee = $('[data-marquee]');
    const btn = $('[data-marquee-toggle]');
    if (!marquee || !btn) return;
    btn.addEventListener('click', () => {
      const paused = marquee.classList.toggle('is-paused');
      btn.setAttribute('aria-pressed', String(paused));
      btn.textContent = paused ? 'Play animation' : 'Pause animation';
    });
  }

  /* ---------- "Assemble your team" role picker ---------- */
  function initAssemble() {
    const root = $('[data-assemble]');
    if (!root) return;
    const link = $('[data-assemble-link]', root);
    const chips = $$('[data-role]', root);
    const update = () => {
      const roles = chips.filter((c) => c.getAttribute('aria-pressed') === 'true').map((c) => c.dataset.role);
      link.href = roles.length ? `/contact?roles=${encodeURIComponent(roles.join(','))}` : '/contact';
      link.textContent = roles.length ? `Book a call for ${roles.length} ${roles.length === 1 ? 'role' : 'roles'}` : 'Book a call';
    };
    chips.forEach((chip) =>
      chip.addEventListener('click', () => {
        chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
        update();
      })
    );
  }

  /* ---------- Newsletter (progressive enhancement) ---------- */
  function initNewsletter() {
    const form = $('[data-newsletter]');
    if (!form || !window.fetch) return;
    const status = $('[data-newsletter-status]', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        status.textContent = 'Enter a valid email address.';
        form.email.focus();
        return;
      }
      const button = $('button', form);
      button.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        status.textContent = data.message;
        if (data.ok) form.reset();
      } catch {
        form.submit(); // fall back to a normal form post
      } finally {
        button.disabled = false;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMegaMenu();
    initMobileNav();
    initTabs();
    initCarousel();
    initMarquee();
    initAssemble();
    initNewsletter();
  });
})();
