'use strict';

const express = require('express');
const site = require('../data/site');

const router = express.Router();

const meta = (title, description, path) => ({ title, description: description || site.company.description, path });

router.get('/', (req, res) => {
  res.render('pages/home', {
    page: { ...meta(`${site.company.name} | Software development and engineering teams`, null, '/'), isHome: true }
  });
});

router.get('/services', (req, res) => {
  res.render('pages/services', {
    page: meta('Software development services', 'Front-end, back-end, AI, mobile, cloud, design, QA and data engineering from Cerebyte Technologies.', '/services')
  });
});

router.get('/technologies', (req, res) => {
  res.render('pages/technologies', {
    page: meta('Technologies we work with', 'Engineers across 40+ languages, frameworks, clouds and AI tools.', '/technologies')
  });
});

router.get('/industries', (req, res) => {
  res.render('pages/industries', {
    page: meta('Industries we serve', 'Software for fintech, healthcare, retail, logistics, manufacturing and more.', '/industries')
  });
});

router.get('/about', (req, res) => {
  res.render('pages/about', { page: meta('About us', null, '/about') });
});

router.get('/careers', (req, res) => {
  res.render('pages/careers', {
    page: meta('Careers', 'Join Cerebyte Technologies and build software for product companies around the world.', '/careers')
  });
});

router.get('/contact', (req, res) => {
  const preselected = String(req.query.roles || '')
    .split(',')
    .map((r) => r.trim())
    .filter((r) => site.roles.includes(r));
  const model = site.engagementModels.find((m) => m.id === req.query.model);
  res.render('pages/contact', {
    page: meta('Book a call', 'Tell us what you are building and we will suggest the right team.', '/contact'),
    values: { roles: preselected, model: model ? model.name : '' },
    errors: {}
  });
});

router.get('/thank-you', (req, res) => {
  res.render('pages/message', {
    page: meta('Thank you', null, '/thank-you'),
    heading: 'Thanks, we have your message.',
    text: 'Someone from our team will reply within one working day to set up a discovery call. Check your inbox, and your spam folder just in case.',
    links: [
      { label: 'Read the blog', href: '/blog' },
      { label: 'Back to home', href: '/' }
    ]
  });
});

router.get('/blog', (req, res) => {
  res.render('pages/blog', { page: meta('Blog', 'Notes on building software teams, AI features and delivery.', '/blog') });
});

router.get('/blog/:slug', (req, res, next) => {
  const post = site.posts.find((p) => p.slug === req.params.slug);
  if (!post) return next();
  const more = site.posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  res.render('pages/post', { page: meta(post.title, post.excerpt, `/blog/${post.slug}`), post, more });
});

router.get('/privacy', (req, res) => {
  res.render('pages/legal', { page: meta('Privacy policy', null, '/privacy'), kind: 'privacy' });
});

router.get('/terms', (req, res) => {
  res.render('pages/legal', { page: meta('Terms of service', null, '/terms'), kind: 'terms' });
});

router.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${site.company.url}/sitemap.xml\n`);
});

router.get('/sitemap.xml', (req, res) => {
  const paths = ['/', '/services', '/technologies', '/industries', '/about', '/careers', '/contact', '/blog', ...site.posts.map((p) => `/blog/${p.slug}`)];
  const urls = paths.map((p) => `  <url><loc>${site.company.url}${p}</loc></url>`).join('\n');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
});

module.exports = router;
