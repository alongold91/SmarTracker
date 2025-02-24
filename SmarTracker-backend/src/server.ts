import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import { config } from './config/config';
import Logging from './library/Logging';
import { expensesRouter } from './routes/expenses';
import { usersRouter } from './routes/users';
import { initDB } from './utils/initDB';

const router = express();

/* Initialize Database and Start Server */
initDB()
    .then(() => {
        Logging.info('Database initialized successfully.');
        StartServer();
    })
    .catch((error) => {
        Logging.error(`Failed to initialize database: ${error}`);
    });

/** Only Start Server if DB is initialized */
const StartServer = () => {
  /** Log the request */
  router.use((req, res, next) => {
    /** Log the req */
    Logging.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
      /** Log the res */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  router.use(cookieParser());

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method == 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      return res.status(200).json({});
    }

    next();
  });
  /** Routes */
  router.use('/users', usersRouter);
  router.use('/expenses', expensesRouter);
  /** Healthcheck */
  router.get('/ping', (req, res) =>
    res.status(200).json({ hello: 'world' })
  );
  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error('Not found');

    Logging.error(error);

    res.status(404).json({
      message: error.message
    });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}`)
    );
};
