# Cerebyte Technologies website

Company website built with **Node.js, Express and EJS**. Corporate navy-and-white design, mega-menu navigation, an animated hero, a working contact form and newsletter signup, and no front-end framework or build step.

## Quick start

Requires Node.js 18.18 or newer.

```bash
npm install
npm start          # http://localhost:3000
npm run dev        # restarts automatically when you edit server files
npm run check      # renders every page and reports any that fail
```

## Before you go live

Everything a visitor reads lives in **`data/site.js`**. Search that file for `PLACEHOLDER` and replace:

| What | Why |
| --- | --- |
| `email`, `careersEmail`, `phone`, `address` | Shown in the footer, contact and careers pages |
| `social` links | Empty values are hidden automatically |
| `clients` | Example names only. Use real clients, with their permission |
| `testimonials` | Example quotes only. Use real, approved quotes |
| `stats` | Example numbers only. Use your real figures |
| `jobs` | Your current openings |

Also review `views/pages/legal.ejs`. The privacy policy and terms are starting templates, not legal advice.

## Editing content

- **Text, services, technologies, industries, blog posts, jobs:** `data/site.js`
- **Page layouts:** `views/pages/*.ejs`
- **Shared pieces (header, footer, call-to-action band):** `views/partials/*.ejs`
- **Colours, fonts, spacing:** the variables at the top of `public/css/main.css`
- **Logo:** `views/partials/logo-mark.ejs` and `public/img/favicon.svg`

Headlines ending in a full stop automatically get the blue brand dot.

To add a blog post, add an entry to `posts` in `data/site.js` with a unique `slug`. The cover art is generated from the slug, and `hue` (0 to 360) sets its colour.

## Pages

`/` home, `/services`, `/technologies`, `/industries`, `/about`, `/careers`, `/contact`, `/blog`, `/blog/:slug`, `/privacy`, `/terms`, plus `/sitemap.xml`, `/robots.txt` and a 404 page.

## Forms and leads

The **contact form** (`POST /contact`) validates input on the server, blocks simple spam bots with a hidden honeypot field, and rate-limits each IP address. Valid enquiries are saved to `storage/leads.jsonl`, one JSON record per line.

The **newsletter** (`POST /subscribe`) saves emails to `storage/subscribers.jsonl`.

To be notified about new enquiries, set one or both of these:

- `LEAD_WEBHOOK_URL` posts each lead as JSON to Slack workflows, Zapier, Make, n8n and similar tools.
- `SMTP_*` and `LEAD_EMAIL_TO` email each lead. Run `npm install nodemailer` first.

See `.env.example` for all settings.

The "Assemble your team" picker on the home page and the "Discuss…" links pre-fill the contact form using `/contact?roles=QA engineers,UX designers&model=dedicated-teams`.

## Deployment

Any Node host works, such as Render, Railway, Fly.io, a VPS with PM2, or Azure App Service.

```bash
NODE_ENV=production SITE_URL=https://www.your-domain.com PORT=3000 npm start
```

- Set `SITE_URL` so canonical links and the sitemap use your domain.
- If your host has an ephemeral file system, set `STORAGE_DIR` to a persistent disk, or use the webhook or email option so no leads are lost.
- Behind Nginx or another proxy, client IPs are read correctly because `trust proxy` is enabled.

## What's included

- Security headers with a strict content-security policy (Helmet), gzip compression, and static file caching in production.
- A self-hosted Onest font (SIL Open Font License, see `public/fonts/OFL-LICENSE.txt`), so there are no third-party font requests.
- Keyboard-accessible mega-menu, tabs and carousel, a skip link, visible focus styles, and respect for the reduced-motion setting. The hero animation pauses when it's off-screen.
- Responsive layout from 360px phones to large desktops.

## Project structure

```
server.js              Express app: security, static files, template helpers, errors
routes/pages.js        Page routes, sitemap, robots.txt
routes/forms.js        Contact and newsletter handlers
lib/                   Validation, rate limiting, storage, lead notifications
data/site.js           All site content
views/pages/           One template per page
views/partials/        Header, footer, logo, CTA band, blog cards, diagrams
public/css/main.css    Styles
public/js/main.js      Menu, tabs, carousel, role picker, newsletter
public/js/network.js   Animated hero network
scripts/check.js       Smoke test for every page
storage/               Saved leads and subscribers (git-ignored)
```
