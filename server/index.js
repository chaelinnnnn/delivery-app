import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// CORS: allow only the deployed frontend
app.use(
  cors({
    origin: 'https://delivery-app-three-iota.vercel.app',
  }),
);

const SHEET_ID = process.env.SHEET_ID || '1JTsPuDuUCxZj6J6amqlcqGu5CQBVqbe6aqpfwX3H8c4';
const RANGE = 'Sheet1!A:J';

function getGoogleAuth() {
  const raw = process.env.GOOGLE_CREDENTIALS_JSON;
  if (!raw) {
    throw new Error('GOOGLE_CREDENTIALS_JSON environment variable is not set');
  }

  let credentials;
  try {
    credentials = JSON.parse(raw);
  } catch (e) {
    throw new Error('Failed to parse GOOGLE_CREDENTIALS_JSON');
  }

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

/**
 * Column mapping (Sheet1!A:J)
 * A: date
 * B: region
 * C: team_leader
 * D: vehicle_id
 * E: delivery_time
 * F: location
 * G: action
 * H: status
 * I: categories (comma-separated)
 * J: confirmed
 */
function parseRows(rows) {
  if (!rows || rows.length < 2) return [];
  const [, ...dataRows] = rows;
  return dataRows.map((row) => {
    const [
      date = '',
      region = '',
      teamLeader = '',
      vehicleId = '',
      deliveryTime = '',
      location = '',
      action = '',
      statusRaw = '',
      categoriesStr = '',
      confirmedStr = '',
    ] = row;

    const tags = categoriesStr
      ? categoriesStr.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const status = String(statusRaw).trim() || 'in-transit';
    const statusKey = status.toLowerCase();
    const statusTextMap = {
      'in-transit': 'In Transit',
      preparing: 'Preparing',
      delivered: 'Delivered',
    };
    const statusText =
      statusTextMap[statusKey] ||
      status
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const confirmed = /^(1|y|yes|true|확인|done)$/i.test(String(confirmedStr).trim());
    const dimmed = !confirmed;

    return {
      date: String(date).trim(),
      regionLabel: String(region).trim(),
      teamName: String(teamLeader).trim(),
      teamId: String(vehicleId).trim(),
      time: String(deliveryTime).trim(),
      location: String(location).trim(),
      tags,
      stageLabel: String(action).trim() || 'Setup',
      status,
      statusText,
      confirmed,
      dimmed,
    };
  });
}

/**
 * Group parsed rows into response structure:
 * {
 *   date: string,
 *   region: string,
 *   team_leader: string,
 *   vehicle_id: string,
 *   deliveries: [
 *     {
 *       time,
 *       location,
 *       action,
 *       status,
 *       categories,
 *       confirmed,
 *     },
 *   ]
 * }
 */
function toDeliveryResponse(parsed) {
  const byTeam = new Map();
  for (const row of parsed) {
    const key = [
      row.date,
      row.regionLabel,
      row.teamName,
      row.teamId,
    ]
      .map((v) => v || '')
      .join('|');

    if (!byTeam.has(key)) {
      byTeam.set(key, {
        date: row.date,
        region: row.regionLabel,
        team_leader: row.teamName,
        vehicle_id: row.teamId,
        deliveries: [],
      });
    }

    byTeam.get(key).deliveries.push({
      time: row.time,
      location: row.location,
      action: row.stageLabel,
      status: row.statusText,
      categories: row.tags,
      confirmed: row.confirmed,
    });
  }

  return Array.from(byTeam.values());
}

app.get('/api/deliveries', async (req, res) => {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });
    const rows = data.values || [];
    const parsed = parseRows(rows);
    const response = toDeliveryResponse(parsed);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Failed to fetch sheet',
      message: err.message,
    });
  }
});

const PORT = Number(process.env.SERVER_PORT) || 3001;
app.listen(PORT, () => {
  console.log(`API server http://localhost:${PORT}`);
});
