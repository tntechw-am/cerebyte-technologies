/*
 * Hero "neural network": nodes linked by synapses, with signals travelling between them.
 * A nod to the name: cere(brum) + byte. Static when the visitor prefers reduced motion,
 * and paused when the hero is off-screen or the tab is hidden.
 */
(function () {
  'use strict';

  const canvas = document.querySelector('[data-network]');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const COLORS = { line: '143,176,255', node: '#8fb0ff', hot: '#ffffff', signal: '#5b8cff' };

  let width = 0, height = 0, dpr = 1;
  let nodes = [], edges = [], signals = [];
  let running = false, visible = true, rafId = 0, lastSpawn = 0;
  const pointer = { x: -9999, y: -9999 };

  // Deterministic random so the layout is stable between reloads.
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

  function build() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width; height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    seed = 7;
    const mobile = width < 640;
    const count = mobile ? 26 : Math.min(70, Math.round((width * height) / 15000));
    // Bias nodes to the right on wide screens so the headline stays clear.
    const xStart = mobile ? 0 : width * 0.38;
    nodes = Array.from({ length: count }, () => {
      const x = xStart + rand() * (width - xStart);
      const y = 20 + rand() * (height - 40);
      return { x, y, ox: x, oy: y, r: 1.6 + rand() * 2.6, phase: rand() * Math.PI * 2, glow: 0 };
    });

    // Link each node to its nearest neighbours.
    const maxDist = mobile ? 130 : 190;
    const seen = new Set();
    edges = [];
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
        .filter((n) => n.j !== i && n.d < maxDist)
        .sort((p, q) => p.d - q.d)
        .slice(0, 3)
        .forEach(({ j }) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!seen.has(key)) { seen.add(key); edges.push([i, j]); }
        });
    });
    signals = [];
  }

  function spawnSignal() {
    if (!edges.length) return;
    const [a, b] = edges[Math.floor(Math.random() * edges.length)];
    const forward = Math.random() > 0.5;
    signals.push({ from: forward ? a : b, to: forward ? b : a, t: 0, speed: 0.008 + Math.random() * 0.01, hops: 2 + Math.floor(Math.random() * 3) });
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    // Gentle drift so the network feels alive.
    const animate = !reduceMotion.matches;
    nodes.forEach((n) => {
      if (animate) {
        n.x = n.ox + Math.sin(time / 2600 + n.phase) * 4;
        n.y = n.oy + Math.cos(time / 3100 + n.phase) * 4;
      }
      const near = Math.max(0, 1 - Math.hypot(n.x - pointer.x, n.y - pointer.y) / 160);
      n.glow = Math.max(n.glow * 0.94, near * 0.8);
    });

    ctx.lineWidth = 1;
    edges.forEach(([i, j]) => {
      const a = nodes[i], b = nodes[j];
      const heat = Math.max(a.glow, b.glow);
      ctx.strokeStyle = `rgba(${COLORS.line},${0.2 + heat * 0.4})`;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    });

    // Signals travel along edges and hop to a neighbouring edge on arrival.
    if (animate) {
      signals = signals.filter((s) => {
        s.t += s.speed;
        const a = nodes[s.from], b = nodes[s.to];
        if (s.t >= 1) {
          b.glow = 1;
          s.hops -= 1;
          if (s.hops <= 0) return false;
          const next = edges.filter((e) => e.includes(s.to) && !e.includes(s.from));
          if (!next.length) return false;
          const e = next[Math.floor(Math.random() * next.length)];
          s.from = s.to; s.to = e[0] === s.to ? e[1] : e[0]; s.t = 0;
          return true;
        }
        const x = a.x + (b.x - a.x) * s.t, y = a.y + (b.y - a.y) * s.t;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 10);
        grad.addColorStop(0, 'rgba(255,255,255,0.95)');
        grad.addColorStop(0.35, 'rgba(91,140,255,0.55)');
        grad.addColorStop(1, 'rgba(91,140,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
        return true;
      });
      if (time - lastSpawn > 420 && signals.length < 14) { spawnSignal(); lastSpawn = time; }
    }

    nodes.forEach((n) => {
      if (n.glow > 0.05) {
        ctx.fillStyle = `rgba(91,140,255,${n.glow * 0.35})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 7 * n.glow, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = n.glow > 0.5 ? COLORS.hot : COLORS.node;
      ctx.globalAlpha = 0.7 + n.glow * 0.3;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  function loop(time) {
    draw(time);
    rafId = running ? requestAnimationFrame(loop) : 0;
  }

  function updateRunning() {
    const shouldRun = visible && !document.hidden && !reduceMotion.matches;
    if (shouldRun && !running) { running = true; rafId = requestAnimationFrame(loop); }
    else if (!shouldRun && running) { running = false; cancelAnimationFrame(rafId); }
    if (!shouldRun) draw(performance.now()); // keep a static frame on screen
  }

  build();
  draw(0);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { build(); draw(performance.now()); }, 150);
  });

  const hero = canvas.parentElement;
  hero.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
  });
  hero.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateRunning(); }).observe(hero);
  }
  document.addEventListener('visibilitychange', updateRunning);
  reduceMotion.addEventListener('change', updateRunning);
  updateRunning();
})();
