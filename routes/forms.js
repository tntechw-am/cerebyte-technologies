'use strict';

const express = require('express');
const site = require('../data/site');
const store = require('../lib/store');
const { notifyLead } = require('../lib/notify');
const { rateLimit } = require('../lib/rateLimit');
const { validateContact, validateEmail } = require('../lib/validate');

const router = express.Router();
const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 8 });

const wantsJson = (req) => req.accepts(['html', 'json']) === 'json';

router.post('/contact', limiter, async (req, res, next) => {
  try {
    // Honeypot: real people never see or fill the "website" field.
    if (req.body.website) return res.redirect(303, '/thank-you');

    const { values, errors, valid } = validateContact(req.body, site);
    if (!valid) {
      return res.status(422).render('pages/contact', {
        page: { title: 'Book a call', path: '/contact' },
        values,
        errors
      });
    }

    const lead = { ...values, ip: req.ip, userAgent: req.get('user-agent') || '' };
    await store.append('leads', lead);
    notifyLead(values); // fire and forget; never blocks the visitor
    res.redirect(303, '/thank-you');
  } catch (err) {
    next(err);
  }
});

router.post('/subscribe', limiter, async (req, res, next) => {
  try {
    const { email, valid } = validateEmail(req.body.email);
    let back = '/';
    try {
      back = new URL(req.get('referer')).pathname || '/';
    } catch {
      /* no or invalid referer: send them home */
    }

    if (!valid) {
      if (wantsJson(req)) return res.status(422).json({ ok: false, message: 'Enter a valid email address.' });
      return res.redirect(303, `${back}?subscribed=invalid#newsletter`);
    }

    await store.append('subscribers', { email });
    if (wantsJson(req)) return res.json({ ok: true, message: 'You are subscribed. Look out for our next issue.' });
    res.redirect(303, `${back}?subscribed=1#newsletter`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
