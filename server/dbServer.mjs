import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'farmerbox_db.json');
const PORT = process.env.PORT || 5000;

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial state cache
let database = {
  orders: [],
  zones: [],
  joiners: [],
  hotels: [],
  drivers: [],
  products: [],
  payments: [],
  notifications: []
};

// Load existing database if available
const loadDatabase = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      database = { ...database, ...JSON.parse(data) };
      console.log(`[DB] Loaded persistent database from ${DB_FILE}`);
    } else {
      console.log('[DB] No database file found, initializing empty store.');
      saveDatabase();
    }
  } catch (err) {
    console.error('[DB] Failed to load database file:', err);
  }
};

// Save database to disk
const saveDatabase = () => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(database, null, 2), 'utf8');
  } catch (err) {
    console.error('[DB] Failed to write database file:', err);
  }
};

loadDatabase();

// Connected SSE clients for real-time live push
const sseClients = new Set();

const broadcast = (event, data) => {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch (err) {
      sseClients.delete(client);
    }
  }
};

// CORS and response helpers
const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const sendJson = (res, statusCode, data) => {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // 1. Health / Status
  if (pathname === '/api/status' && req.method === 'GET') {
    const counts = {};
    for (const key of Object.keys(database)) {
      counts[key] = (database[key] || []).length;
    }
    return sendJson(res, 200, {
      status: 'online',
      time: new Date().toISOString(),
      connectedClients: sseClients.size,
      counts
    });
  }

  // 2. SSE Live Event Stream
  if (pathname === '/api/stream' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    res.write(`data: ${JSON.stringify({ type: 'connected', time: Date.now() })}\n\n`);
    sseClients.add(res);
    console.log(`[SSE] Client connected. Total active clients: ${sseClients.size}`);

    req.on('close', () => {
      sseClients.delete(res);
      console.log(`[SSE] Client disconnected. Total active clients: ${sseClients.size}`);
    });
    return;
  }

  // 3. Database Seeding Endpoint
  if (pathname === '/api/seed' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const seedData = JSON.parse(body || '{}');
        for (const [key, items] of Object.entries(seedData)) {
          if (Array.isArray(items)) {
            database[key] = items;
          }
        }
        saveDatabase();
        broadcast('database_seeded', { timestamp: Date.now() });
        return sendJson(res, 200, { success: true, message: 'Database seeded successfully' });
      } catch (err) {
        return sendJson(res, 400, { error: 'Invalid JSON seed body', details: String(err) });
      }
    });
    return;
  }

  // 4. Collection CRUD: /api/:collection or /api/:collection/:id
  const match = pathname.match(/^\/api\/([a-zA-Z0-9_]+)(?:\/([a-zA-Z0-9_#-]+))?$/);
  if (match) {
    const collection = match[1];
    const id = match[2];

    if (!database[collection]) {
      database[collection] = [];
    }

    // GET /api/:collection
    if (req.method === 'GET' && !id) {
      return sendJson(res, 200, database[collection]);
    }

    // GET /api/:collection/:id
    if (req.method === 'GET' && id) {
      const item = database[collection].find((i) => String(i.id) === id);
      if (!item) return sendJson(res, 404, { error: 'Item not found' });
      return sendJson(res, 200, item);
    }

    // POST /api/:collection (Insert or Update)
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          const item = JSON.parse(body || '{}');
          const itemId = id || item.id || `doc_${Date.now()}`;
          const normalizedItem = { ...item, id: itemId };

          const existingIndex = database[collection].findIndex(
            (i) => String(i.id) === String(itemId)
          );

          if (existingIndex >= 0) {
            database[collection][existingIndex] = normalizedItem;
          } else {
            database[collection].unshift(normalizedItem);
          }

          saveDatabase();
          console.log(`[DB] Saved ${collection} item ${itemId}. Broadcasting to ${sseClients.size} clients.`);
          broadcast('update', { collection, item: normalizedItem });

          return sendJson(res, 200, { success: true, id: itemId, item: normalizedItem });
        } catch (err) {
          return sendJson(res, 400, { error: 'Invalid JSON body' });
        }
      });
      return;
    }

    // DELETE /api/:collection/:id
    if (req.method === 'DELETE' && id) {
      const initialLength = database[collection].length;
      database[collection] = database[collection].filter((i) => String(i.id) !== id);

      if (database[collection].length !== initialLength) {
        saveDatabase();
        broadcast('delete', { collection, id });
        return sendJson(res, 200, { success: true, id });
      }
      return sendJson(res, 404, { error: 'Item not found' });
    }
  }

  // 404 Fallback
  sendJson(res, 404, { error: 'Endpoint not found' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=================================================`);
  console.log(` FarmerBox Unified Real-Time Database Server    `);
  console.log(` Status: Running at http://0.0.0.0:${PORT}       `);
  console.log(` Database: ${DB_FILE}                           `);
  console.log(`=================================================`);
});
