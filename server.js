'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const site = require('./data/site');
const pageRoutes = require('./routes/pages');
const formRoutes = require('./routes/forms');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1); // correct client IPs behind Nginx, Render, Railway, etc.
app.disable('x-powered-by');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        // Only upgrade to HTTPS in production so localhost keeps working.
        'upgrade-insecure-requests': isProd ? [] : null
      }
    }
  })
);
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: isProd ? '7d' : 0 }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.use(express.json({ limit: '20kb' }));

// Values available in every template.
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.currentPath = req.path;
  res.locals.year = new Date().getFullYear();
  res.locals.subscribed = req.query.subscribed; // newsletter result shown in the footer
  /** Escapes text and turns a trailing full stop into the accent-coloured brand dot. */
  res.locals.headline = (text) => {
    const escaped = String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    return escaped.replace(/([.?!])$/, '<span class="dot">$1</span>');
  };
  res.locals.formatDate = (iso) =>
    new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  next();
});

app.use(pageRoutes);
app.use(formRoutes);

app.use((req, res) => {
  res.status(404).render('pages/message', {
    page: { title: 'Page not found', path: req.path },
    heading: 'We could not find that page.',
    text: 'The link may be out of date, or the page may have moved. Try the services page or go back home.',
    links: [
      { label: 'Go to the home page', href: '/' },
      { label: 'Browse services', href: '/services' }
    ]
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('pages/message', {
    page: { title: 'Something went wrong', path: req.path },
    heading: 'Something went wrong on our side.',
    text: `Refresh the page to try again. If it keeps happening, email us at ${site.company.email}.`,
    links: [{ label: 'Go to the home page', href: '/' }]
  });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Cerebyte Technologies running at http://localhost:${PORT}`));
}

module.exports = app;
