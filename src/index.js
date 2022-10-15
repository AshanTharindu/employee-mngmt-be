import cors from 'cors';
import httpContext from 'express-http-context';
import compression from 'compression';
import express from 'express';
import routes from './routes';

import { APP_HOST, APP_PORT, BASE_URL } from './configs/config';

const app = express();

app.set('port', APP_PORT);
app.set('host', APP_HOST);

// standard middleware
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(httpContext.middleware);

// API Routes
app.use(BASE_URL, routes);

app.listen(app.get('port'), app.get('host'), () => {
  console.log(
    `Server started at http://${app.get('host')}:${app.get('port')}${BASE_URL}`
  );
});

// // Catch unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection', err);
  process.exit(1);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', err);
  process.exit(1);
});
