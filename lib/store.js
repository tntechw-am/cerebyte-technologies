'use strict';

const fs = require('fs/promises');
const path = require('path');

const STORAGE_DIR = process.env.STORAGE_DIR || path.join(__dirname, '..', 'storage');

/**
 * Appends one JSON record per line to storage/<name>.jsonl.
 * Simple and dependency-free; swap for a database when you outgrow it.
 */
async function append(name, record) {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
  const line = JSON.stringify({ ...record, createdAt: new Date().toISOString() }) + '\n';
  await fs.appendFile(path.join(STORAGE_DIR, `${name}.jsonl`), line, 'utf8');
}

module.exports = { append };
