'use strict';

/**
 * All website content lives here so you can edit text without touching templates.
 * Anything marked PLACEHOLDER should be replaced with your real details before going live.
 */

const company = {
  name: 'Cerebyte Technologies',
  shortName: 'Cerebyte',
  tagline: 'Software engineering teams that ship.',
  description:
    'Cerebyte Technologies builds and staffs software teams for product companies: vetted engineers across 40+ technologies, AI-fluent and working your hours.',
  url: process.env.SITE_URL || 'http://localhost:3000',
  email: 'info@cerebytetech.com', // PLACEHOLDER
  careersEmail: 'careers@cerebytetech.com', // PLACEHOLDER
  phone: '+91 96004 63174', // PLACEHOLDER
  address: '',
  social: {
    // PLACEHOLDER: add real profile URLs. Empty values are hidden.
    linkedin: 'https://www.linkedin.com/',
    x: '',
    github: 'https://github.com/',
    instagram: ''
  }
};

const announcement = {
  enabled: true,
  text: 'New: AI engineering pods that add LLM features to your product in weeks.',
  linkText: 'See how it works',
  href: '/services#ai-ml'
};

const services = [
  {
    id: 'front-end',
    name: 'Front-end development',
    summary: 'Fast, accessible interfaces that hold up as your product and traffic grow.',
    details:
      'We build web front-ends with a component system your team can keep extending, performance budgets that are measured on every release, and accessibility checked against WCAG 2.2.',
    deliverables: ['Design-system components', 'Single-page and server-rendered apps', 'Performance and accessibility audits', 'Legacy UI migrations'],
    tags: ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript']
  },
  {
    id: 'back-end',
    name: 'Back-end development',
    summary: 'Secure APIs and services that stay reliable under real-world load.',
    details:
      'From a first API to a platform of services, we design data models, write tested code and set up the monitoring that tells you when something drifts before your users do.',
    deliverables: ['REST and GraphQL APIs', 'Microservices and event-driven systems', 'Database design and tuning', 'Third-party integrations'],
    tags: ['Node.js', 'Java', '.NET', 'Python', 'Go', 'PostgreSQL']
  },
  {
    id: 'ai-ml',
    name: 'AI and machine learning',
    summary: 'LLM features and ML pipelines built to run in production, not just in a demo.',
    details:
      'We help you pick the use cases worth building, then ship them with evaluation suites, guardrails and cost tracking so you know the feature keeps working after launch.',
    deliverables: ['LLM apps, agents and retrieval (RAG)', 'Model evaluation and guardrails', 'ML pipelines and MLOps', 'Data preparation and labelling'],
    tags: ['Python', 'PyTorch', 'LLMs', 'Generative AI', 'Vector databases']
  },
  {
    id: 'mobile',
    name: 'Mobile app development',
    summary: 'iOS and Android apps with smooth performance and secure data handling.',
    details:
      'Native or cross-platform, we take apps from prototype to store release and keep them healthy with crash monitoring, staged rollouts and automated device testing.',
    deliverables: ['iOS and Android apps', 'Cross-platform apps', 'Offline-first sync', 'App store release management'],
    tags: ['Swift', 'Kotlin', 'React Native', 'Flutter']
  },
  {
    id: 'cloud-devops',
    name: 'Cloud and DevOps',
    summary: 'Pipelines and infrastructure that make every release routine.',
    details:
      'We set up infrastructure as code, CI/CD and observability so your team can deploy several times a day with confidence, and we keep an eye on the cloud bill while doing it.',
    deliverables: ['Cloud migration', 'CI/CD pipelines', 'Infrastructure as code', 'Monitoring and cost optimisation'],
    tags: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Terraform']
  },
  {
    id: 'design',
    name: 'UX/UI design',
    summary: 'Clear user flows, reusable components and layouts everyone can use.',
    details:
      'Our designers run research, map flows and build component libraries in close step with engineering, so what gets designed is what gets shipped.',
    deliverables: ['User research and testing', 'Product and interaction design', 'Design systems', 'Accessibility reviews'],
    tags: ['Figma', 'Prototyping', 'Design systems']
  },
  {
    id: 'qa',
    name: 'QA and test automation',
    summary: 'Release-ready software, checked by people and by automated suites.',
    details:
      'We combine exploratory testing with automated suites that run on every pull request, so regressions are caught in minutes instead of in production.',
    deliverables: ['Test strategy', 'UI and API automation', 'Performance testing', 'Manual and exploratory testing'],
    tags: ['Playwright', 'Cypress', 'Selenium', 'k6']
  },
  {
    id: 'data',
    name: 'Data engineering',
    summary: 'Pipelines and warehouses that turn scattered data into reliable reporting.',
    details:
      'We consolidate data from your products and tools into a warehouse with tested pipelines and dashboards that teams actually trust.',
    deliverables: ['Data pipelines (ETL/ELT)', 'Warehouses and lakehouses', 'BI dashboards', 'Data quality checks'],
    tags: ['Snowflake', 'BigQuery', 'dbt', 'Airflow', 'Power BI']
  }
];

const technologies = [
  { group: 'Front-end', items: ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'JavaScript', 'Svelte', 'Tailwind CSS'] },
  { group: 'Back-end', items: ['Node.js', 'Java', 'Spring Boot', '.NET', 'C#', 'Python', 'Django', 'Go', 'PHP', 'Laravel', 'Ruby on Rails'] },
  { group: 'Mobile', items: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'iOS', 'Android'] },
  { group: 'Data and AI', items: ['PyTorch', 'TensorFlow', 'LLMs', 'LangChain', 'Pandas', 'Snowflake', 'BigQuery', 'dbt', 'Power BI'] },
  { group: 'Cloud and DevOps', items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] },
  { group: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB'] },
  { group: 'Testing', items: ['Playwright', 'Cypress', 'Selenium', 'Jest', 'k6', 'Appium'] },
  { group: 'AI coding tools', items: ['Claude Code', 'GitHub Copilot', 'Cursor'] }
];

// Two rows for the scrolling strip on the home page.
const techStrip = [
  ['Node.js', 'React', 'Python', 'Java', '.NET', 'TypeScript', 'Go', 'AWS', 'Kubernetes'],
  ['Angular', 'Swift', 'Kotlin', 'Flutter', 'PostgreSQL', 'Vue.js', 'PHP', 'Azure', 'PyTorch']
];

const industries = [
  { name: 'Fintech and banking', text: 'Payments, lending and compliance tooling with audit trails built in.' },
  { name: 'Healthcare', text: 'Patient apps and clinical platforms with privacy designed in from the start.' },
  { name: 'Retail and eCommerce', text: 'Storefronts, checkout and inventory systems that cope with peak days.' },
  { name: 'Logistics', text: 'Tracking, routing and warehouse software that keeps goods moving.' },
  { name: 'Manufacturing', text: 'Shop-floor dashboards, IoT data and ERP integrations.' },
  { name: 'Education', text: 'Learning platforms and assessment tools for schools and companies.' },
  { name: 'Insurance', text: 'Quoting, claims and policy administration modernised step by step.' },
  { name: 'Media and entertainment', text: 'Streaming, publishing and content workflows at scale.' },
  { name: 'Travel and hospitality', text: 'Booking engines and guest apps that work across channels.' },
  { name: 'Real estate', text: 'Listing platforms, property management and tenant portals.' },
  { name: 'Automotive', text: 'Connected-vehicle apps, dealer systems and telematics.' },
  { name: 'Startups', text: 'From first MVP to the team that scales it after funding.' }
];

// PLACEHOLDER: replace with real client logos (with their permission).
const clients = ['Northwind Pay', 'Lumen Health', 'Kestrel', 'Orbitly', 'Vantage Freight', 'Halcyon Labs'];

// PLACEHOLDER: replace with real, approved client quotes.
const testimonials = [
  {
    quote:
      'Cerebyte gave us three senior engineers in under two weeks. They joined our standups on day one and were shipping to production by the end of the first sprint.',
    name: 'Priya Raman',
    role: 'VP of Engineering, Northwind Pay'
  },
  {
    quote:
      'What stood out was how often they pushed back with better ideas. We came for capacity and stayed for the judgement.',
    name: 'Daniel Okafor',
    role: 'CTO, Lumen Health'
  },
  {
    quote:
      'They rebuilt our checkout while the old one was still taking orders. Zero downtime, and page load dropped by more than half.',
    name: 'Sara Lindqvist',
    role: 'Head of Product, Kestrel'
  },
  {
    quote:
      'Weekly reports, clear estimates and no surprises on the invoice. It is the easiest vendor relationship I manage.',
    name: 'Arjun Mehta',
    role: 'Director of Technology, Vantage Freight'
  }
];

// PLACEHOLDER: replace with your real numbers.
const stats = [
  { value: '120+', label: 'projects delivered' },
  { value: '3 yrs', label: 'average client relationship' },
  { value: '4.9/5', label: 'average client rating' },
  { value: '40+', label: 'technologies in use' }
];

const reasons = [
  { title: 'Vetted people', text: 'Every engineer passes technical interviews, a paid trial task and a communication review before joining a client team.' },
  { title: 'The right shape of team', text: 'Start with one developer or a full pod with a tech lead, QA and designer. Change the mix as the work changes.' },
  { title: 'Hours that overlap', text: 'Teams plan at least four hours of overlap with your timezone every working day, and they write clear English.' },
  { title: 'Ready in days', text: 'Most teams are interviewed and onboarded within two weeks. Scale up or down with 30 days notice.' }
];

const roles = ['Software developers', 'QA engineers', 'UX designers', 'Data scientists', 'DevOps engineers', 'Project managers'];

const engagementModels = [
  {
    id: 'staff-augmentation',
    question: 'Need a few extra engineers?',
    name: 'Staff augmentation',
    text: 'Add senior developers straight into your team. They work your hours, join your standups and follow your process, just like full-time hires.',
    points: ['You lead the work day to day', 'Start with one engineer', 'Replace or add people at short notice']
  },
  {
    id: 'dedicated-teams',
    question: 'Need a team to own a workstream?',
    name: 'Dedicated teams',
    text: 'Get a self-managed pod for a product area or project. We agree priorities together, then our tech lead runs delivery and reports progress weekly.',
    points: ['Tech lead, engineers, QA and design', 'Shared roadmap and sprint reviews', 'Run several pods in parallel']
  },
  {
    id: 'end-to-end',
    question: 'Want the whole build handled?',
    name: 'End-to-end delivery',
    text: 'Hand over the full lifecycle, from discovery to launch and support. You set the outcomes and budget; we own the plan, the build and the release.',
    points: ['Fixed scope or milestone-based pricing', 'Discovery and architecture included', 'Post-launch support and maintenance']
  }
];

const processSteps = [
  { title: 'Book a discovery call', text: 'Tell us about your product, goals, timeline and budget. We will suggest a team shape and an engagement model that fits.' },
  { title: 'Meet your team', text: 'Within days you get a shortlist of engineers to interview. Once you approve them, we agree milestones and onboard the team.' },
  { title: 'Start and track progress', text: 'Work begins right away. You get weekly progress reports, a named account lead and the freedom to adjust the team as you go.' }
];

const posts = [
  {
    slug: 'staff-augmentation-vs-dedicated-teams',
    title: 'Staff augmentation or a dedicated team: how to choose',
    excerpt: 'Both add engineering capacity. The difference is who manages the work, and that changes everything else.',
    author: 'Cerebyte Editorial',
    date: '2026-10-12',
    readTime: '5 min read',
    hue: 222,
    body: [
      'When a roadmap outgrows the team, there are two common ways to add capacity without a long hiring cycle. Staff augmentation places individual engineers inside your existing team. A dedicated team is a self-managed unit that owns a defined area of work.',
      'The deciding question is simple: who will manage the work day to day? If you already have strong engineering leads with time to onboard and direct new people, augmentation is usually faster and cheaper. The new engineers slot into your rituals and tools, and you keep full control of priorities.',
      'If your leads are already stretched, adding more people for them to manage often slows things down. A dedicated team brings its own tech lead, QA and sometimes design, so it can take a goal and run with it. You stay involved through sprint reviews and a shared roadmap rather than daily task assignment.',
      'Many companies use both. They augment the core platform team with a few specialists, and put a dedicated pod on a new product line that would otherwise compete for the same people. Start with the model that matches your management capacity today, and revisit it every quarter.'
    ]
  },
  {
    slug: 'shipping-llm-features-to-production',
    title: 'Shipping LLM features that survive production',
    excerpt: 'A demo takes a weekend. A feature customers rely on needs evaluation, guardrails and cost controls.',
    author: 'Cerebyte Editorial',
    date: '2026-09-28',
    readTime: '6 min read',
    hue: 262,
    body: [
      'Most teams can get an impressive language-model prototype working in a few days. The hard part comes after: the feature has to give acceptable answers for thousands of real inputs, at a predictable cost, without leaking data or embarrassing the brand.',
      'Start with an evaluation set before you write much code. Collect a few hundred real examples with the answers you expect, and score every change against them. Without this, prompt tweaks feel like progress while quietly breaking cases you fixed last week.',
      'Next, decide what the model is not allowed to do and enforce it outside the prompt. Input filtering, output validation and clear fallbacks to a human or a simpler rule-based path protect users when the model is unsure.',
      'Finally, track cost and latency per request from day one. Caching, smaller models for simple cases and retrieval that sends only the context that matters can cut costs dramatically. Treat these numbers like any other production metric, with alerts when they drift.'
    ]
  },
  {
    slug: 'onboarding-remote-engineers-in-two-weeks',
    title: 'Onboarding remote engineers in two weeks, not two months',
    excerpt: 'A short, written onboarding plan gets new engineers shipping in their first sprint.',
    author: 'Cerebyte Editorial',
    date: '2026-09-09',
    readTime: '4 min read',
    hue: 196,
    body: [
      'New engineers rarely struggle with the code itself. They struggle with everything around it: access requests, unwritten conventions, and not knowing who to ask. Each blocker costs a day, and a dozen of them cost a month.',
      'Write a one-page onboarding checklist and keep it in the repository. Include every account they need, how to run the project locally, how code review works, and the names of two people they can ask anything.',
      'Give each new engineer a small, real ticket on day two. Shipping something to production in the first week builds confidence and exposes gaps in the setup instructions while they are still fresh.',
      'Pair them with a buddy for the first two weeks, and schedule a short check-in at the end of each week. Ask what slowed them down, then fix the checklist so the next person moves faster.'
    ]
  }
];

// PLACEHOLDER: replace with real openings.
const jobs = [
  { title: 'Senior Node.js Engineer', team: 'Engineering', location: 'Hybrid, India', type: 'Full-time' },
  { title: 'React Developer', team: 'Engineering', location: 'Remote, India', type: 'Full-time' },
  { title: 'Machine Learning Engineer', team: 'AI', location: 'Hybrid, India', type: 'Full-time' },
  { title: 'QA Automation Engineer', team: 'Quality', location: 'Remote, India', type: 'Full-time' },
  { title: 'Technical Project Manager', team: 'Delivery', location: 'Hybrid, India', type: 'Full-time' }
];

const values = [
  { title: 'Own the outcome', text: 'We measure our work by what ships and how it performs, not by hours logged.' },
  { title: 'Say it early', text: 'Risks, delays and better ideas get raised the day we see them.' },
  { title: 'Keep learning', text: 'Every engineer has paid time each month for courses, certifications and side projects.' },
  { title: 'Write it down', text: 'Clear docs and decision records mean nobody is ever the single point of failure.' }
];

const nav = [
  {
    label: 'Services',
    href: '/services',
    intro: 'Software development services built around what your product needs.',
    columns: [
      {
        title: 'How we work with you',
        links: engagementModels.map((m) => ({ label: m.name, href: `/services#${m.id}` }))
      },
      {
        title: 'What we build',
        links: services.map((s) => ({ label: s.name, href: `/services#${s.id}` }))
      }
    ],
    allLink: { label: 'All services', href: '/services' }
  },
  {
    label: 'Technologies',
    href: '/technologies',
    intro: 'Engineers across 40+ languages, frameworks and platforms.',
    columns: [
      {
        title: 'Popular',
        links: ['Node.js', 'React', 'Python', 'Java', '.NET', 'TypeScript', 'AWS', 'Flutter'].map((t) => ({ label: t, href: '/technologies' }))
      },
      {
        title: 'By area',
        links: technologies.slice(0, 7).map((g) => ({ label: g.group, href: `/technologies#${slugify(g.group)}` }))
      }
    ],
    allLink: { label: 'All technologies', href: '/technologies' }
  },
  {
    label: 'Industries',
    href: '/industries',
    intro: 'Experience in the rules, risks and users of your sector.',
    columns: [
      { title: 'Industries', links: industries.slice(0, 6).map((i) => ({ label: i.name, href: '/industries' })) },
      { title: '', links: industries.slice(6, 12).map((i) => ({ label: i.name, href: '/industries' })) }
    ],
    allLink: { label: 'All industries', href: '/industries' }
  },
  {
    label: 'About',
    href: '/about',
    intro: 'The people and principles behind Cerebyte.',
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'Our story', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'Contact us', href: '/contact' }
        ]
      },
      {
        title: 'Read',
        links: [{ label: 'Blog', href: '/blog' }]
      }
    ],
    allLink: { label: 'About Cerebyte', href: '/about' }
  },
  { label: 'Blog', href: '/blog' }
];

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

module.exports = {
  company,
  announcement,
  services,
  technologies,
  techStrip,
  industries,
  clients,
  testimonials,
  stats,
  reasons,
  roles,
  engagementModels,
  processSteps,
  posts,
  jobs,
  values,
  nav,
  slugify
};
