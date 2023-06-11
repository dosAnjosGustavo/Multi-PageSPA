import bodyParser from 'body-parser';
import express from 'express';

import eventRoutes from './routes/events';
import authRoutes from './routes/auth';

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(authRoutes);

app.use('/events', eventRoutes);
app.get('/', (req, res) => {
  res.status(200).send('Hello Lalo!');
});

const errorMiddleware: express.ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
};

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('server listening on port', 8080);
});
