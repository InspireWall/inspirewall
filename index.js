const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, '..', 'data', 'emails.json');
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY || '';
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID || '';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'dev-secret';

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf8');
}

function appendEmailToFile(email) {
  ensureDataFile();
  const all = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || [];
  all.push({ email, timestamp: new Date().toISOString() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf8');
}

app.get('/', (req, res) => {
  res.json({ success: true, message: 'InspireWall email API up' });
});

// Admin: get stored emails (local only, requires ADMIN_SECRET)
app.get('/api/emails', (req, res) => {
  const secret = req.query.secret || req.headers['x-admin-secret'];
  if (!secret || secret !== ADMIN_SECRET) return res.status(401).json({ error: 'Unauthorized' });
  ensureDataFile();
  const all = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || [];
  return res.json({ success: true, count: all.length, emails: all });
});

app.post('/api/subscribe', async (req, res) => {
  const email = (req.body && req.body.email) ? String(req.body.email).trim() : '';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, error: 'Invalid email' });

  try {
    // If MAILCHIMP configured, add subscriber
    if (MAILCHIMP_API_KEY && MAILCHIMP_LIST_ID) {
      const DATACENTER = MAILCHIMP_API_KEY.split('-').slice(-1)[0];
      const memberId = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
      const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${memberId}`;
      const payload = { email_address: email, status_if_new: 'subscribed' };
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `apikey ${MAILCHIMP_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      const json = await response.json();

      if (response.ok) {
        // Save a local copy as backup
        appendEmailToFile(email);
        return res.json({ success: true, source: 'mailchimp', data: json });
      } else {
        console.error('Mailchimp error', json);
        // fallback to local storage
        appendEmailToFile(email);
        return res.status(200).json({ success: true, source: 'local-fallback', error: json });
      }
    }

    // No Mailchimp configured -> save locally
    appendEmailToFile(email);
    return res.json({ success: true, source: 'local' });
  } catch (err) {
    console.error('Subscribe error', err);
    // as a fallback, store locally
    try { appendEmailToFile(email); } catch (e) { /* ignore */ }
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`InspireWall email server running on http://localhost:${PORT}`);
});
