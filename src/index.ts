/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// libs
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import WebSocket from 'ws';
import http from 'http';
import responseTime from 'response-time';
import 'dotenv/config';
import morgan from 'morgan';

// models
import User from './models/user';

// Initialize Express
const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// Secure HTTP headers
app.use(helmet());

if (process.env.ENV === 'DEV') {
  // morgan
  app.use(morgan('dev'));
}

// Parse the body payload
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Create a middleware that adds a X-Response-Time header to responses.
app.use(responseTime());

// Configure CORS policy if you're going to use this a decoupled server for your JS app
const whitelist = [
  process.env.CLIENT_APP_URL,
];

const corsMiddlewareOptions = {
  credentials: true,
  origin: (origin, callback) => {
    console.log('Request from:', origin);
    if (!origin) {
      callback(null, true);
      return;
    }

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      callback(new Error(msg));
    }
  },
};

app.use(cors(corsMiddlewareOptions));

// Enable pre-flight request for form-data requests
// For any HTTP verb other than GET/HEAD/POST (such as DELETE) or routes that use custom headers.
app.options('*', cors()); // include before other routes

// Parse JSON request body
app.use(express.json({ limit: '100000mb' }));
app.use(express.urlencoded({ extended: false, limit: '100000mb' }));

// Initialize authentication middleware
app.set('trust proxy', 1);
// app.use(passport.initialize());

// List of all models
User.sync();

// Start WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/socket' });

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', (ws) => {
  // this is so TS would shut up
  const newWS = JSON.parse(JSON.stringify(ws));

  newWS.isAlive = true;
  ws.on('pong', heartbeat);
});

const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    const newWS = JSON.parse(JSON.stringify(ws));

    if (!newWS.isAlive) return newWS.terminate();

    newWS.isAlive = false;
    newWS.ping();
    newWS.send(JSON.stringify({ type: 'pong' }));
    return newWS;
  });
}, 5000);

wss.on('close', () => {
  clearInterval(interval);
});

// Start the server
server.listen(PORT, () => console.log(`Server started and listening on ${PORT}`));

export default wss;