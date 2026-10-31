'use strict';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v, max = 200) => String(v == null ? '' : v).trim().slice(0, max);
const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

function validateContact(body, { roles, engagementModels }) {
  const allowedModels = [...engagementModels.map((m) => m.name), 'Not sure yet'];
  const values = {
    name: clean(body.name, 120),
    email: clean(body.email, 160).toLowerCase(),
    company: clean(body.company, 160),
    phone: clean(body.phone, 40),
    model: clean(body.model, 60),
    roles: asArray(body.roles).map((r) => clean(r, 60)).filter((r) => roles.includes(r)),
    budget: clean(body.budget, 60),
    timeline: clean(body.timeline, 60),
    message: clean(body.message, 4000),
    consent: body.consent === 'on' || body.consent === 'true'
  };

  const errors = {};
  if (values.name.length < 2) errors.name = 'Enter your full name.';
  if (!EMAIL_RE.test(values.email)) errors.email = 'Enter an email address like name@company.com.';
  if (values.model && !allowedModels.includes(values.model)) errors.model = 'Choose one of the options.';
  if (values.message.length < 20) errors.message = 'Tell us a little more about the project (at least 20 characters).';
  if (!values.consent) errors.consent = 'Tick the box so we can contact you about your enquiry.';

  return { values, errors, valid: Object.keys(errors).length === 0 };
}

function validateEmail(value) {
  const email = clean(value, 160).toLowerCase();
  return { email, valid: EMAIL_RE.test(email) };
}

module.exports = { validateContact, validateEmail };
