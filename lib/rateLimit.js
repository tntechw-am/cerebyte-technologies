'use strict';

/**
 * Tiny in-memory rate limiter for form posts (per IP).
 * For multiple server instances, use a shared store such as Redis instead.
 */
function rateLimit({ windowMs = 10 * 60 * 1000, max = 5 } = {}) {
  const hits = new Map();

  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of hits) if (entry.reset < now) hits.delete(ip);
  }, windowMs).unref();

  return function limiter(req, res, next) {
    const now = Date.now();
    const entry = hits.get(req.ip) || { count: 0, reset: now + windowMs };
    if (entry.reset < now) {
      entry.count = 0;
      entry.reset = now + windowMs;
    }
    entry.count += 1;
    hits.set(req.ip, entry);
    if (entry.count > max) {
      res.status(429);
      return req.accepts(['html', 'json']) === 'json'
        ? res.json({ ok: false, message: 'Too many requests. Try again in a few minutes.' })
        : res.render('pages/message', {
            page: { title: 'Too many requests', path: req.path },
            heading: 'Too many requests.',
            text: 'You have sent several forms in a short time. Wait a few minutes, then try again.'
          });
    }
    next();
  };
}

module.exports = { rateLimit };
